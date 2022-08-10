import pyttsx3
from decouple import config
from datetime import datetime
import speech_recognition as sr
from random import choice
from queries import working_on_queries

USERNAME = config('OWNER')
BOTNAME = config('BOTNAME')

# SAPI5 is the Microsoft Speech API - work on Windows
# NSSS is NSSpeechSynthesizer for Mac OS X
from sys import platform
if platform == "linux" or platform == "linux2":
    engine = pyttsx3.init('espeak')
elif platform == "darwin":
    engine = pyttsx3.init('nsss')
elif platform == "win32":
    engine = pyttsx3.init('sapi5')

# Set Rate
engine.setProperty('rate', 190)

# Set Volume
engine.setProperty('volume', 1.0)

# Set Voice (Male)
# Male voice is voices[0]; Female is voices[1]
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

# Text to Speech Conversion
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Greet the user according to the time of the day
def greet_user():
    hour = datetime.now().hour
    if (hour >= 6) and (hour < 12):
        speak(f"Good Morning {USERNAME}")
    elif (hour >= 12) and (hour < 17):
        speak(f"Good afternoon {USERNAME}")
    elif (hour >= 17) and (hour < 24):
        speak(f"Good Evening {USERNAME}")
    speak(f"I am {BOTNAME}. How may I assist you?")

# Takes Input from User
def take_user_input():
    """Takes user input, recognizes it using Speech Recognition module and converts it into text"""

    r = sr.Recognizer()
    with sr.Microphone() as source:
        print('Listening....')
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print('Recognizing...')
        query = r.recognize_google(audio, language='en-in')
        if not 'exit' in query or 'stop' in query:
            speak(choice(working_on_queries))
        else:
            speak('Have a good day!')
            exit()
    except Exception:
        speak('Sorry, I could not understand. Could you please say that again?')
        query = 'None'
    return query

if __name__ == '__main__':
    greet_user()
    while True:
        query = take_user_input().lower()
        print(query)
