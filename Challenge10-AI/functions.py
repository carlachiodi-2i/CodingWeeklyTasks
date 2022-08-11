import os
import subprocess as sp

paths = {
    'notepad': "/System/Applications/TextEdit.app/Contents/MacOS/TextEdit",
    'calculator': "/System/Applications/Calculator.app/Contents/MacOS/Calculator",
    'terminal': "/System/Applications/Utilities/Terminal.app/Contents/MacOS/Terminal",
    'email': "/Applications/Microsoft Outlook.app/Contents/MacOS/Microsoft Outlook"
}

def open_program(program):
    sp.Popen(paths[program])
