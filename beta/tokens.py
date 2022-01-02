class Type:
    def __init__(self, name, regex=None):
        self.name = name
        self.regex = regex

types = {
    "num": Type("num", regex="\d*"),
    "str": Type("str", regex='".*"'),
    "bool": Type("bool", regex="(true|false)"),
    "arrow": Type("arrow", regex="->"),
    "object": Type("fun", regex="[a-z]"),
    "operator": Type("base")
}

class Token:
    def __init__(self, exp, type=types["operator"]):
        self.exp = exp
        seld.type = type

operators = {
    "plus": Token("+"),
    "minus": Token("-"),
    "star": Token("*"),
    "slash": Token("/")
}
