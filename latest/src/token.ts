import { TokenType } from "./tokenType";

export class Token {
    public readonly type: TokenType;
    public readonly text: string;
    public readonly pos: number;

    constructor(type: TokenType, text: string, pos: number) {
        this.type = type;
        this.text = text;
        this.pos = pos;
    }
}