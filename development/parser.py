import os
import types

from lexer import Lexer


builtins = {
    "print": "print"
}


def sc_eval(tokens):
    parse = {}
    pos = 0
    
    while pos < len(tokens):
        if tokens[pos].type.name == "arrow":
            parse[tokens[pos-1]] = arguments[pos+1]
        pos += 1
    
    return parse
