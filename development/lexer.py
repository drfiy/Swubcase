import re

from tokens import Token
from tokens import types


class Lexer:
    def __init__(self, code, pos=0):
        text = "" # for catching tokens
        self.exps = []
        
        while pos < len(code):
            if code[pos] == " " or code[pos] == "\n":
                if len([sym for sym in text if sym == '"']) % 2 == 0:
                    self.exps.append(text)
                    text = ""
                    pos += 1
            
            text += code[pos]
            pos += 1
        
        self.exps.append(text)
        
        
        self.tokens = []
        for exp in self.exps:
            for type in types.values():
                if re.match(type.regex, exp):
                    self.tokens.append(Token(exp, type))
                    break
