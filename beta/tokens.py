class Type:
    def __init__(self, name, regex=None):
        self.name = name
        self.regex = regex

types = {
    "num": Type("num", regex="\d*"),
    "str": Type("str", regex='".*"'),
    "bool": Type("bool", regex="(true|false)"),
    "arrow": Type("arrow", regex="->"),
    "objectName": Type("fun", regex="[a-z]"),
    "base": Type("base")
}

class Token:
    def __init__(self, exp, type):
        self.exp = exp
        seld.type = type

base = {
    "plus": Token("+", type=types["base"]),
    "minus": Token("-", type=types["base"]),
    "star": Token("*", type=types["base"]),
    "slash": Token("/", types["base"])
}
