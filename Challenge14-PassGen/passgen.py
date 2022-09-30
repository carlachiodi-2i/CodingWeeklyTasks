# Given any L, N, X, C write a code that would return:
# a L long string containing
# N numeric characters,
# X non alphabetic (&%$£$),
# C capital English alphabet characters (A-Z) and,
# L - (N + X + C) non capital English alphabet characters,
# mixing all character types in random order.

# Make sure that L is bigger or equal to sum of the N, X and C and
# no negative values are passed.

# Bonus points: Make sure no same character is repeating next to another. (pasSword is ok, password is not ok)
# Sample:
# itsNotAPasswordGeneratorAtAll(2, 0, 0, 0) -> az
# itsNotAPasswordGeneratorAtAll(5, 1, 1, 1) -> 8i&yC, !8Udf, c0q&F
# itsNotAPasswordGeneratorAtAll(5, 5, 1, 1) -> error

from functions import validInputs
from functions import inputChecker
# The letters from the task will be called: length (L), numeric (N), symbol (X), capitalLetters (C), nonCapital (L - (N + X + C))


loopVariables = ['length', 'numeric', 'symbol', 'capitalLetters']

for variable in loopVariables:
    validInputs(variable)
inputChecker()
