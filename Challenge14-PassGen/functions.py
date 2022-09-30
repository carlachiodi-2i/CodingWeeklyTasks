import random
import string

# The letters from the task will be called: length (L), numeric (N), symbol (X), capitalLetters (C), nonCapital (L - (N + X + C))
inputs = {
    'length': {'value': 0, 'message': 'What is the length of the password?'},
    'numeric': {'value': 0, 'message': 'How many numbers?'},
    'symbol': {'value': 0, 'message': 'How many symbols?'},
    'capitalLetters': {'value': 0, 'message': 'How many capital letters?'},
}


def passgen(length, numeric, symbol, capitalLetters, nonCapital):
    numbers = ''.join(random.choice(string.digits) for i in range(numeric))
    symbols = ''.join(random.choice(string.punctuation) for i in range(symbol))
    upperLetters = ''.join(random.choice(string.ascii_uppercase)
                           for i in range(capitalLetters))
    lowerLetters = ''.join(random.choice(string.ascii_lowercase)
                           for i in range(nonCapital))
    characters = numbers + symbols + upperLetters + lowerLetters

    finalCombination = ''.join(random.sample(characters, length))

    return print(finalCombination)


def inputChecker():
    length = inputs['length']['value']
    numeric = inputs['numeric']['value']
    symbol = inputs['symbol']['value']
    capitalLetters = inputs['capitalLetters']['value']

    if (length < (numeric + symbol + capitalLetters)):
        return print('error')
    else:
        nonCapital = length - (numeric + symbol + capitalLetters)
        return passgen(length, numeric, symbol, capitalLetters, nonCapital)


def validInputs(variable):
    while True:
        try:
            inputs[variable]['value'] = int(input(inputs[variable]['message']))
        except ValueError:
            print("Sorry, some of the inputs are not numbers. Please, try again.")
            continue
        if inputs[variable]['value'] < 0:
            print("Sorry, need positive numbers. Please, try again.")
            continue
        else:
            break
