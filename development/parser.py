class Parser:
    def __init__(self, tokens):
        funs = {}
        objs = {}
        pos = 0

        while pos < len(tokens):
            if tokens[pos].type.name == "arrow":
                funs[tokens[pos-1].exp] = tokens[pos+1].exp
            elif tokens[pos].type.name == "recogn":
                objs[tokens[pos-1].exp] = tokens[pos+1].exp
            pos += 1

        self.functions = funs
        self.objects = objs
    
    def compile(self):
        funs = []
        
        if self.compile() is not None:
            ...
