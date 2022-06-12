import { Token } from "../token";
import { ExpressionNode } from "./expressionNode";

export class VariableNode extends ExpressionNode {
    public readonly variable: Token;

    constructor(variable: Token) {
        super();
        
        this.variable = variable;
    }
}
