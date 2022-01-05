class Parser:
    def __init__(self, tokens):
        parse = {}
        pos = 0
        
        while pos < len(tokens):
            if tokens[pos].type.name == "arrow":
                parse[tokens[pos-1].exp] = tokens[pos+1].exp
            pos += 1
        
        self.parse = parse
