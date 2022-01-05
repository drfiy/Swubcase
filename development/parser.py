# Bad code present

import os

import types
from lexer import Lexer


builtins = {
    "print": "print",
    "->": "("
} # Not used


def sceval(arguments):
    parser = {}
    index = 0
    for argument in arguments:
        if "->" in argument:
            parser[arguments[index-1]] = arguments[index+1]
        else:
            index += 1
    return parser
        


print("Swubcase 3.11 Beta")
while True:
    command = input(os.getcwd() + " $ ") # scrun test/test.sc

    if command.endswith(".sc") and command.startswith("scrun "):
        filepath = command.split("scrun ")[1]
        with open(filepath, "r") as scfile:
            lexer = Lexer(scfile.read())

            args = []
            for token in lexer.tokens:
                args.append(token.exp)
            print(sceval(args))
