from gtts import gTTS
from pydub import AudioSegment

# Function to convert text to speech and save as an audio file
def convert_text_to_speech(text, filename):
    # Create a temporary mp3 file
    tts = gTTS(text)
    tts.save(filename + ".mp3")

    # Convert mp3 file to wav
    sound = AudioSegment.from_mp3(filename + ".mp3")
    sound.export(filename + ".wav", format="wav")
