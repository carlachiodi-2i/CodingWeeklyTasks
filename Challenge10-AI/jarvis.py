import pyttsx3
from decouple import config
from datetime import datetime
import speech_recognition as sr
from random import choice
from queries import working_on_queries
from functions import open_program

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
engine.setProperty('rate', 280)

# Set Volume
engine.setProperty('volume', 1.0)

# Set type of voice (there are male and female options, from different languages as well)
voices = engine.getProperty('voices')
# Commented out because I used it to find out which was a better voice for me
# for voice in voices:
#     print(voice, voice.id)
#     engine.setProperty('voice', voice.id)
#     engine.say("Hello World!")
#     engine.runAndWait()
#     engine.stop()
#  voice #7 is a male voice, en-UK
engine.setProperty('voice', voices[7].id)

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
        print(audio)

    try:
        print('Recognizing...')
        query = r.recognize_google(audio, language='en-uk')
        if not 'exit' in query or 'stop' in query:
            speak(choice(working_on_queries))
        elif 'hey jarvis' in query:
            greet_user()
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
