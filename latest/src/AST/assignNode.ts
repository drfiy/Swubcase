import { ExpressionNode } from "./expressionNode";
import { Token } from "../token";

export class AssignNode extends ExpressionNode {
    public readonly operator: Token;
    public readonly leftNode: ExpressionNode;
    public readonly rightNode: ExpressionNode;

    constructor(operator: Token, leftNode: ExpressionNode, rightNode: ExpressionNode) {
        super();
        
        this.operator = operator;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}
