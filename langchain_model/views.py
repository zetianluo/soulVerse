from flask import Flask, request, render_template, redirect, url_for, Blueprint
from openai.error import RateLimitError
from langchain_model.chat_gpt import generate_chat

main = Blueprint('main', __name__)

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# POST -> get form data; GET -> get query string.
@app.route('/gpt4', methods=['GET', 'POST'])
def gpt4():
    if request.method == "POST":
        try:
            data = request.form["human_input"]
            output = generate_chat(data)
            return redirect(url_for("index", result=output.choices[0].text)) # be careful with this
        except KeyError:
            output = "An error occurred while processing the input. Please check your input and try again."
        except RateLimitError:
            output = "The server is experiencing a high volume of requests. Please try again later."
        except Exception as e:
            output = f"An error occurred: {str(e)}"
        return render_template('index.html', result=output)
    else:
        return render_template('index.html')

