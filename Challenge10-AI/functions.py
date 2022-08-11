import os
import subprocess as sp
import wikipedia
import pywhatkit as kit
from decouple import config
from email.message import EmailMessage
import smtplib
import webbrowser

EMAIL = config("EMAIL")
PASSWORD = config("PASSWORD")

paths = {
    'notepad': "/System/Applications/TextEdit.app/Contents/MacOS/TextEdit",
    'calculator': "/System/Applications/Calculator.app/Contents/MacOS/Calculator",
    'terminal': "/System/Applications/Utilities/Terminal.app/Contents/MacOS/Terminal",
    'email': "/Applications/Microsoft Outlook.app/Contents/MacOS/Microsoft Outlook",
    'teams': "/Applications/Microsoft Teams.app/Contents/MacOS/Microsoft Teams"
}

def open_program(program):
    sp.Popen(paths[program])

def search_wikipedia(query):
    results = wikipedia.summary(query)
    return results

def play_youtube(video):
    kit.playonyt(video)

def google_search(query):
    kit.search(query)

def send_email(receiver_email, subject, message):
    try:
        email = EmailMessage()
        email['To'] = receiver_email
        email["Subject"] = subject
        email['From'] = EMAIL
        email.set_content(message)
        s = smtplib.SMTP("smtp-mail.outlook.com", 587)
        s.starttls()
        s.login(EMAIL, PASSWORD)
        s.send_message(email)
        s.close()
        return True
    except Exception as e:
        print(e)
        return False

def open_Tempora():
    webbrowser.open('https://www.gototempora.com/HostedTempora/Content/TimeEntry/TimeEntry.aspx')