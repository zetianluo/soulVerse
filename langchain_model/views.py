from flask import Flask, request, render_template, Blueprint, send_file
from openai.error import RateLimitError
from .chat_gpt import generate_chat
from .tts import convert_text_to_speech
from .stt import process_audio_file

main = Blueprint('main', __name__)

# Route for the main page
@main.route('/')
def index():
    return render_template('index.html')

    
@main.route('/voice-to-gpt4', methods=['POST'])
# Accepts an audio file, transcribes it to text, sends that text to the GPT-4 model, and returns the resulting speech as an audio file.
def voice_text_gpt4_voice():
    if 'file' not in request.files:
        return "No file part"

    file = request.files['file']
    filename = file.filename

    if filename == '':
        return "No selected file"

    if file:
        file.save(filename)  # Save the file temporarily
        text = process_audio_file(filename)  # Process the audio file, stt
        os.remove(filename)  # Delete the file after processing it

        try:
            output = generate_chat(text)
            # Use the generated output to create a .wav file
            filename_output = "output_gpt4.wav"
            convert_text_to_speech(output, filename_output) # tts
            return send_file(filename_output, mimetype='audio/wav')
        except KeyError:
            output = "An error occurred while processing the input. Please check your input and try again."
        except RateLimitError:
            output = "The server is experiencing a high volume of requests. Please try again later."
        except Exception as e:
            output = f"An error occurred: {str(e)}"
        return render_template('index.html', result=output)
    