import speech_recognition as sr
import os

def process_audio_file(filename):
    
    '''
    Arg:
    filename(string): A string of the file name including suffix.

    Note: Only support WAV, AIFF, AIFF-C, and FLAC file type.
    '''

    # Initialize recognizer class (for recognizing the speech)
    r = sr.Recognizer()

    # open the file
    with sr.AudioFile(filename) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        text = r.recognize_google(audio_data)
        return text
