class Parser:
    def __init__(self, tokens):
        parse = {}
        pos = 0

        while pos < len(tokens):
            if tokens[pos].type.name == "arrow":
                parse[tokens[pos-1].exp] = tokens[pos+1].exp
            pos += 1

        self.parse = parse
    
    def compile(self):
        builtin = {
            "print": "print"
        }
        
        funs = []
        
        for fun, args in self.parse.items():
            if fun in builtin.keys():
                funs.append(f"{builtin[fun]}({args})")
        
        return [eval(fun) for fun in funs]
