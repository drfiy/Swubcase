import { Token } from "../token";
import { ExpressionNode } from "./expressionNode";

export class UnarOperationNode {
    public readonly operator: Token;
    public readonly operand: ExpressionNode;

    constructor(operator: Token, operand: ExpressionNode) {
        this.operator = operator;
        this.operand = operand;
    }
}
