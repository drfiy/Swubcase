class Parser:
    def __init__(self, tokens):
        funs = {}
        objs = {}
        pos = 0

        while pos < len(tokens):
            if tokens[pos].type.name == "arrow":
                funs[tokens[pos-1]] = tokens[pos+1]
            elif tokens[pos].type.name == "recogn":
                objs[tokens[pos-1]] = tokens[pos+1]
            pos += 1

        self.functions = funs
        self.objects = objs
        
        self.objects["print"] = 'print("%T0")'
        self.objects[""] = ''
    
    def _function(self, fun, args: list):
        if fun.exp in self.objects:
            fun = self.objects[fun.exp]
            for i in range(len(args)):
                fun = fun.replace("%T"+str(i), str(args[i]))
        return fun
    
    def compile(self):
        for fun, arg in self.functions.items():
            if arg.type.name == "array":
                arg = eval(arg.exp)
            else:
                print("error")
            
            eval(self._function(fun, arg))
