class Token:
    def __init__(self, exp, type):
        self.exp = exp
        self.type = type

class Type:
    def __init__(self, name, regex=None):
        self.name = name
        self.regex = regex

types = {
    "str": Type("str", regex='".*?"'),
    "num": Type("num", regex="[0-9]"),
    "bool": Type("bool", regex="(true|false)"),
    "array": Type("array", regex="\[.*?\]"),
    "arrow": Type("arrow", regex="->"),
    "op": Type("op", regex="[+*-/]"),
    "obj": Type("obj", regex=".")
}
