import requests
from flask import Flask, request, render_template, Blueprint, jsonify, make_response
from openai.error import RateLimitError
from .chat_gpt import generate_chat
from .tts import convert_text_to_speech
from .stt import process_audio_file
from flask_socketio import emit
from flask_cors import CORS
import base64
import nest_asyncio
import os
import json
import time
import logging
from hume import HumeBatchClient
from hume.models.config import LanguageConfig
import math
from werkzeug.utils import secure_filename

logging.basicConfig(level=logging.INFO) # this line should be at the start of your script
nest_asyncio.apply()

main = Blueprint('main', __name__)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = os.getcwd()

ALLOWED_EXTENSIONS = {'txt'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_blueprint(socketio):
    # Route for the main page
    @main.route('/')
    def index():
        return render_template('index.html')

    @main.route('/txt_hume', methods=['POST'])
    def upload_file():
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part', 400
        file = request.files['file']
        print('file uploded:', file)
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'No selected file', 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "rb") as f:
                files = {"file": (filename, f, "text/plain")}
                payload = {"json": "{\"models\":{\"language\":{\"granularity\":\"sentence\",\"identify_speakers\":false},\"ner\":{\"identify_speakers\":false}},\"transcription\":{\"language\":\"en\"},\"notify\":false}"}
                headers = {
                    "accept": "application/json",
                    "X-Hume-Api-Key": "B6aoq9ayCvV3V3zXE6pBftxHgHfOBvvggU8mjXJlwOpdSX9m"
                }
                url = "https://api.hume.ai/v0/batch/jobs"
                response = requests.post(url, data=payload, files=files, headers=headers)
                response_dict = json.loads(response.text)
                # access the job_id from the dictionary, job prediction
                job_id = response_dict['job_id']
                url = "https://api.hume.ai/v0/batch/jobs/" + job_id + "/predictions"
                headers = {
                    "accept": "application/json; charset=utf-8",
                    "X-Hume-Api-Key": "B6aoq9ayCvV3V3zXE6pBftxHgHfOBvvggU8mjXJlwOpdSX9m"
                }

                max_attempts = 10
                attempts = 0
                while attempts < max_attempts:
                    response = requests.get(url, headers=headers)
                    
                    if response.status_code == 200:  # success
                        print("Got job prediction(Emotion)!")
                        # print("response====", response.text)
                        break
                    else:
                        attempts += 1
                        print(f'Attempt {attempts} failed. Retrying in 5 seconds...')
                        time.sleep(5)  # pause for 5 seconds before next attempt

                if attempts == max_attempts:
                    print(f"Failed to get a successful response after {max_attempts} attempts.")
                
                # Parse the predictions JSON
                parsed_predictions = json.loads(response.text)
                # print("parsed_predictions = ", parsed_predictions)
                # Extract the 'text' and 'emotions' from the predictions
                text_emotions = []
                for prediction in parsed_predictions:
                    for result in prediction['results']['predictions']:
                        # print('resulttt=', result)
                        for pred in result['models']['language']['grouped_predictions'][0]['predictions']:
                            text = pred['text']
                            emotions = [emotion for emotion in pred['emotions'] if emotion['score'] >= 0.02]
                            # print('emotions=', emotions)
                            if emotions:  # Only append when emotions list is not empty
                                text_emotions.append({'text': text, 'emotions': emotions})
                # print("text_emotions=", text_emotions)

                # Calculate the number of emotions to append
                num_emotions_to_append = math.ceil(len(text_emotions) * 0.50)
                # Find the max 'score' for each item and store them in a list along with their indices
                max_scores_with_indices = [(i, max(e['score'] for e in item['emotions'])) for i, item in enumerate(text_emotions)]
                # Sort this list by 'score' in descending order
                sorted_scores_with_indices = sorted(max_scores_with_indices, key=lambda x: x[1], reverse=True)
                # Get the top N scores
                top_scores_with_indices = sorted_scores_with_indices[:num_emotions_to_append]

                # Initialize variables
                result_string = ""
                top_emotion_item = None
                max_emotion_score = 0

                # Loop over items
                for i, _ in top_scores_with_indices:
                    item = text_emotions[i]
                    text = item['text']
                    emotions = item['emotions']

                    # Sort emotions by 'score' in descending order and take top 5
                    top_5_emotions = sorted(emotions, key=lambda e: e['score'], reverse=True)[:5]
                    emotion_string = ', '.join([f"{emotion['name']} {emotion['score']}" for emotion in top_5_emotions])
                    
                    # Check if this item has the highest overall emotion score
                    item_max_score = max([emotion['score'] for emotion in emotions])
                    if item_max_score > max_emotion_score:
                        max_emotion_score = item_max_score
                        top_emotion_item = item
                # Sort emotions by 'score' in descending order and take top 5
                top_5_emotions = sorted(top_emotion_item['emotions'], key=lambda e: e['score'], reverse=True)[:5]
            print('emotion_string===', emotion_string)
            print('top_5_emotions===', top_5_emotions)
            # Prepare the response data as a dict
            response_data = {
                'json_output': emotion_string,
                'bar_chart_5_emotions': top_5_emotions,
                }
            return 'File uploaded successfully', 200
        else:
            return 'File type not allowed', 400
        
    # Accepts a text, sends that text to the GPT-4 model, and returns the resulting speech as an audio file and text output.
    @main.route('/gpt4', methods=['POST'])
    def text_gpt4_voice():
        data = request.get_json() # get JSON data from request
        if data is None or 'message' not in data:
            return "Invalid request", 400

        text = data['message'] # Get the message from the request
        logging.info('input_text=%s', text)
        try:
            # Start Job with Local File. https://dev.hume.ai/reference/start_job
            url = "https://api.hume.ai/v0/batch/jobs"
            with open('message.txt', 'w') as f:
                f.write(text)
            files = {"file": ("message.txt", open("message.txt", "rb"), "text/plain")}
            payload = {"json": "{\"models\":{\"language\":{\"granularity\":\"sentence\",\"identify_speakers\":false},\"ner\":{\"identify_speakers\":false}},\"transcription\":{\"language\":\"en\"},\"notify\":false}"}
            headers = {
                "accept": "application/json",
                "X-Hume-Api-Key": "B6aoq9ayCvV3V3zXE6pBftxHgHfOBvvggU8mjXJlwOpdSX9m"
            }

            response = requests.post(url, data=payload, files=files, headers=headers)
            response_dict = json.loads(response.text)
            # access the job_id from the dictionary, job prediction
            job_id = response_dict['job_id']
            url = "https://api.hume.ai/v0/batch/jobs/" + job_id + "/predictions"
            headers = {
                "accept": "application/json; charset=utf-8",
                "X-Hume-Api-Key": "B6aoq9ayCvV3V3zXE6pBftxHgHfOBvvggU8mjXJlwOpdSX9m"
            }

            max_attempts = 10
            attempts = 0
            while attempts < max_attempts:
                response = requests.get(url, headers=headers)
                
                if response.status_code == 200:  # success
                    print("Got job prediction(Emotion)!")
                    # print("response====", response.text)
                    break
                else:
                    attempts += 1
                    print(f'Attempt {attempts} failed. Retrying in 5 seconds...')
                    time.sleep(5)  # pause for 5 seconds before next attempt

            if attempts == max_attempts:
                print(f"Failed to get a successful response after {max_attempts} attempts.")
            
            # Parse the predictions JSON
            parsed_predictions = json.loads(response.text)
            # print("parsed_predictions = ", parsed_predictions)
            # Extract the 'text' and 'emotions' from the predictions
            text_emotions = []
            for prediction in parsed_predictions:
                for result in prediction['results']['predictions']:
                    # print('resulttt=', result)
                    for pred in result['models']['language']['grouped_predictions'][0]['predictions']:
                        text = pred['text']
                        emotions = [emotion for emotion in pred['emotions'] if emotion['score'] >= 0.02]
                        # print('emotions=', emotions)
                        if emotions:  # Only append when emotions list is not empty
                            text_emotions.append({'text': text, 'emotions': emotions})
            # print("text_emotions=", text_emotions)

            # Calculate the number of emotions to append
            num_emotions_to_append = math.ceil(len(text_emotions) * 0.80)
            # Find the max 'score' for each item and store them in a list along with their indices
            max_scores_with_indices = [(i, max(e['score'] for e in item['emotions'])) for i, item in enumerate(text_emotions)]
            # Sort this list by 'score' in descending order
            sorted_scores_with_indices = sorted(max_scores_with_indices, key=lambda x: x[1], reverse=True)
            # Get the top N scores
            top_scores_with_indices = sorted_scores_with_indices[:num_emotions_to_append]

            # Initialize variables
            result_string = ""
            top_emotion_item = None
            max_emotion_score = 0

            # Loop over items
            for i, _ in top_scores_with_indices:
                item = text_emotions[i]
                text = item['text']
                emotions = item['emotions']

                # Sort emotions by 'score' in descending order and take top 5
                top_5_emotions = sorted(emotions, key=lambda e: e['score'], reverse=True)[:5]
                emotion_string = ', '.join([f"{emotion['name']} {emotion['score']}" for emotion in top_5_emotions])
                result_string += f"My text is '{text}', [The top 5 emotions are: {emotion_string}].\n"
                
                # Check if this item has the highest overall emotion score
                item_max_score = max([emotion['score'] for emotion in emotions])
                if item_max_score > max_emotion_score:
                    max_emotion_score = item_max_score
                    top_emotion_item = item
            # Sort emotions by 'score' in descending order and take top 5
            top_5_emotions = sorted(top_emotion_item['emotions'], key=lambda e: e['score'], reverse=True)[:5]

            # Building a new dictionary that includes 'text' and the top 5 emotions
            top_emotion_item_with_top_5_emotions = {
                'text': top_emotion_item['text'], 
                'emotions': top_5_emotions
            }
            result_string = result_string.strip()  # Remove trailing newline if desired
            # print('result_string==', result_string)
            
            # Openai API
            output = generate_chat(result_string)
            print('output==', output)
            print('top_emotion_item=', top_emotion_item_with_top_5_emotions)
            filename_output = "output_gpt4.wav"
            convert_text_to_speech(output, filename_output) # Convert the output to speech

            # Open the file in binary mode and read it
            with open(os.path.join(os.getcwd(), filename_output), 'rb') as file:
                file_content = file.read()

            # Convert the file content to a base64 string
            base64_content = base64.b64encode(file_content).decode()

            # Prepare the response data as a dict
            response_data = {
                'output': output,
                'emotions': top_emotion_item_with_top_5_emotions,
                'file': {
                    'filename': filename_output,
                    'content': base64_content,
                    'mimetype': 'audio/wav'
                }
            }

            # Make a JSON response with the data
            response = make_response(jsonify(response_data), 200)

            return response
        except KeyError:
            output = "An error occurred while processing the input. Please check your input and try again."
        except RateLimitError:
            output = "The server is experiencing a high volume of requests. Please try again later."
        except Exception as e:
            output = f"An error occurred: {str(e)}"
        return render_template('index.html', result=output)


    @socketio.on('message')
    def handle_message(data):
        print('received message: ' + data)
        try:
            output = generate_chat(data) # Use received text data as input for GPT-4
            filename_output = "output_gpt4.wav"
            convert_text_to_speech(output, filename_output) # Convert the output to speech
            # emit an event 'response' with the output audio file as an argument
            socketio.emit('response', {'file': filename_output})
        except KeyError:
            output = "An error occurred while processing the input. Please check your input and try again."
            socketio.emit('response', {'error': output})
        except RateLimitError:
            output = "The server is experiencing a high volume of requests. Please try again later."
            socketio.emit('response', {'error': output})
        except Exception as e:
            output = f"An error occurred: {str(e)}"
            socketio.emit('response', {'error': output})

    return main
