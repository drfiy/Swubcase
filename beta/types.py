class Type:
    def __init__(self, name, regex=None):
        self.name = name
        self.regex = regex

types = {
    "str": Type("str", regex='".*"'),
    "num": Type("num", regex="\d*"),
    "bool": Type("bool", regex="(true|false)"),
    "arrow": Type("arrow", regex="->"),
    "objectName": Type("fun", regex=".*")
}