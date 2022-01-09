import re
import sys


def lex(characters, token_exprs):
    pos = 0
    tokens = []
    while pos < len(characters):
        match = None
        for token_expr in token_exprs:
            pattern, tag = token_expr
            regex = re.compile(pattern)
            match = regex.match(characters, pos)
            if match:
                text = match.group(0)
                if tag:
                    token = (text, tag)
                    tokens.append(token)
                break
        if not match:
            sys.stderr.write(
                f"Got exception while compiling code:\n"
                f"  SyntaxException at colomn {pos}:\n"
                f"    Unknown character: '{characters[pos]}'.\n"
            )
            sys.exit(1)
        else:
            pos = match.end(0)
    return tokens
