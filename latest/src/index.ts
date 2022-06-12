import { Lexer } from "./lexer";
import { Parser } from "./parser";

// const file = process.argv[2];
const code = 
`a = 10;
b = 5;
print -> a - b;`;

const lexer = new Lexer(code);
const tokens = lexer.lex();

const parser = new Parser(tokens);
const rootNode = parser.parseCode();
parser.execCode(rootNode);
