import { Token } from "../token";

export class NumberNode {
    public readonly number: Token;

    constructor(number: Token) {
        this.number = number;
    }
}
