from flask import Flask, request, render_template, redirect, url_for, Blueprint, send_file
from openai.error import RateLimitError
from langchain_model.chat_gpt import generate_chat
from .tts import convert_text_to_speech

main = Blueprint('main', __name__)

# Route for the main page
@main.route('/')
def index():
    return render_template('index.html')

# POST -> get form data; GET -> get query string.
@main.route('/gpt4', methods=['GET', 'POST'])
def gpt4():
    if request.method == "POST":
        try:
            data = request.form["human_input"]
            output = generate_chat(data)
            # Use the generated output to create a .wav file
            filename = "output.wav"
            convert_text_to_speech(output, filename)
            return send_file(filename, mimetype='audio/wav')
        except KeyError:
            output = "An error occurred while processing the input. Please check your input and try again."
        except RateLimitError:
            output = "The server is experiencing a high volume of requests. Please try again later."
        except Exception as e:
            output = f"An error occurred: {str(e)}"
        return render_template('index.html', result=output)
    else:
        return render_template('index.html')