import pyttsx3

# Initialize the pyttsx3 engine
engine = pyttsx3.init()

# Function to convert text to speech and save as an audio file
def convert_text_to_speech(text, filename):
    engine.save_to_file(text, filename)
    engine.runAndWait()
