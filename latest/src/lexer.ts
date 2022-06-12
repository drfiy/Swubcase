import { Token } from "./token";
import { tokenTypesList } from "./tokenType";

export class Lexer {
    private tokenList: Token[] = [];

    private code: string;
    private position: number = 0;
    
    constructor(code: string) {
        this.code = code;
    }

    private nextToken(): boolean {
        if (this.position >= this.code.length) {
            return false;
        }

        const tokenTypes = Object.values(tokenTypesList);

        for (let i = 0; i < tokenTypes.length; i++) {
            const tokenType = tokenTypes[i];

            const regex = new RegExp(tokenType.regex);
            const matched = this.code.substr(this.position).match(regex);

            if (matched && matched[0]) {
                const token = new Token(tokenType, matched[0], this.position);
                this.position += matched[0].length;
                this.tokenList.push(token);
                return true;
            }
        }

        throw new Error(`На позиции ${this.position} обнаружена ошибка`);
    }

    public lex(): Token[] {
        let looped = 0;

        while (this.nextToken()) {
            looped += 1;
        }

        this.tokenList = this.tokenList.filter(token => token.type.name !== 'EMPTY');
        return this.tokenList;
    }
}