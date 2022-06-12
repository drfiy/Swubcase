import { ExpressionNode } from "./expressionNode";

export class StatementsNode extends ExpressionNode {
    public readonly codeStrings: ExpressionNode[] = [];

    public addNode(node: ExpressionNode) {
        this.codeStrings.push(node);
    }
}
