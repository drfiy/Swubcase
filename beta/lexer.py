class Lexer:
    def __init__(self, code, pos=0):
        text = "" # for catching tokens
        self.tokens = []
        
        while pos < len(code):
            if code[pos] == " " or code[pos] == "\n":
                if len([sym for sym in text if sym == '"']) % 2 == 0:
                    self.tokens.append(text)
                    text = ""
                    pos += 1
            
            text += code[pos]
            pos += 1
        
        self.tokens.append(text)

