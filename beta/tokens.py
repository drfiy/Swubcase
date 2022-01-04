from types import Type


class Token:
    def __init__(self, exp, type):
        self.exp = exp
        self.type = type


base_type = Type("base")

base = {
    "plus": Token("+", type=base_type),
    "minus": Token("-", type=base_type),
    "star": Token("*", type=base_type),
    "slash": Token("/", type=base_type)
}
