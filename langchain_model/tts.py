from gtts import gTTS
from pydub import AudioSegment
import os

def convert_text_to_speech(text, filename):
    # Create a temporary mp3 file
    tts = gTTS(text)
    temp_filename = filename + ".mp3"
    tts.save(temp_filename)

    # Convert mp3 file to wav
    sound = AudioSegment.from_mp3(temp_filename)
    sound.export(filename, format="wav")

    # Delete the temporary mp3 file
    os.remove(temp_filename)