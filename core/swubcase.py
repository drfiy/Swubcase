import sys
from swubcase_parser import *
from swubcase_lexer import *


if __name__ == "__main__":
    if len(sys.argv) == 1:
        with open(input("SwubCase file: ")) as swfile:
            text = swfile.read()
    else:
        with open(sys.argv[1]) as swfile:
            text = swfile.read()
    tokens = sw_lex(text)
    parse_result = imp_parse(tokens)
    if not parse_result:
        sys.stderr.write("Parse error!\n")
        sys.exit(1)
    ast = parse_result.value
    env = {}
    ast.eval(env)

    sys.stdout.write("Final variable values:\n")
    for name in env:
        sys.stdout.write("%s: %s\n" % (name, env[name]))
