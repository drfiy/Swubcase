class Lexer:
    def __init__(self, code, pos=0):
        text = "" # for catching tokens
        self.to_parse = []
        
        while pos < len(code):
            if code[pos] == " " or code[pos] == "\n":
                noq = len([sym for sym in text if sym == '"'])
                if noq % 2 == 0:
                    self.to_parse.append(text)
                    text = ""
                    pos += 1
            
            text += code[pos]
            pos += 1
        
        self.to_parse.append(text)
