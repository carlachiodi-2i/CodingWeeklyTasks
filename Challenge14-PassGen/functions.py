inputs = {
    'length': {'value': 0, 'message': 'What is the length of the password?'},
    'numeric': {'value': 0, 'message': 'How many numbers?'},
    'symbol': {'value': 0, 'message': 'How many symbols?'},
    'capitalLetters': {'value': 0, 'message': 'How many capital letters?'},
}

# The letters from the task will be called: length (L), numeric (N), symbol (X), capitalLetters (C), nonCapital (L - (N + X + C))


def passgen(length, numeric, symbol, capitalLetters, nonCapital):
    return


def inputChecker():
    length = inputs['length']['value']
    numeric = inputs['numeric']['value']
    symbol = inputs['symbol']['value']
    capitalLetters = inputs['capitalLetters']['value']

    if (length < (numeric + symbol + capitalLetters)):
        print('error')
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
