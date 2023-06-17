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

nest_asyncio.apply()

main = Blueprint('main', __name__)

app = Flask(__name__)
CORS(app)


def create_blueprint(socketio):
    # Route for the main page
    @main.route('/')
    def index():
        return render_template('index.html')

    # Accepts a text, sends that text to the GPT-4 model, and returns the resulting speech as an audio file and text output.
    @main.route('/gpt4', methods=['POST'])
    def text_gpt4_voice():
        data = request.get_json() # get JSON data from request
        if data is None or 'message' not in data:
            return "Invalid request", 400

        text = data['message'] # Get the message from the request
        try:
            output = generate_chat(text)
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