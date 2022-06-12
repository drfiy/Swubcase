export class TokenType {
    public readonly name: string;
    public readonly regex: string;

    constructor(name: string, regex: string) {
        this.name = name;
        this.regex = regex;
    }
}

export const tokenTypesList = {
    'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
    'NUMBER': new TokenType('NUMBER', '[0-9]*'),
    'VARIABLE': new TokenType('VARIABLE', '[A-Za-zА-Яа-яЁё]*'),
    'SEMICOLON': new TokenType('SEMICOLON', ';'),
    'ASSIGN': new TokenType('ASSIGN', '='),
    'LOG': new TokenType('LOG', 'print ->'),
    'PLUS': new TokenType('PLUS', '\+'),
    'MINUS': new TokenType('MINUS', '-'),
    'LPAR': new TokenType('LPAR', '\\('),
    'RPAR': new TokenType('RPAR', '\\)'),
}