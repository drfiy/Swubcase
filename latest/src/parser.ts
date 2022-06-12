import { Token } from "./token";
import { TokenType, tokenTypesList } from "./tokenType";

// Abstract Syntax Tree imports separated with others. 
import { ExpressionNode } from "./AST/expressionNode";
import { StatementsNode } from "./AST/statementsNode";
import { NumberNode } from "./AST/numberNode";
import { VariableNode } from "./AST/variableNode";
import { BinOperationNode } from "./AST/binOperationNode";
import { UnarOperationNode } from "./AST/unarOperationNode";

export class Parser {
    private readonly scope: any = {};
    
    private readonly tokens: Token[];
    private position: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    private match(...expected: TokenType[]): Token | null {
        if (this.position < this.tokens.length) {
            const currentToken = this.tokens[this.position];

            if (expected.find(type => type.name === currentToken.type.name)) {
                this.position += 1;
                return currentToken;
            }
        }

        return null;
    }

    private require(...expected: TokenType[]): Token {
        const token = this.match(...expected);

        if (!token) {
            throw new Error(`On position '${this.position}' expected '${expected[0].name}'`);
        }

        return token;
    }

    private parseVariableOrNumber(): ExpressionNode {
        const variable = this.match(tokenTypesList.VARIABLE);
        const number = this.match(tokenTypesList.NUMBER);

        if (number !== null) {
            return new NumberNode(number);
        }

        if (variable !== null) {
            return new VariableNode(variable);
        }

        throw new Error(`On position '${this.position}' expected variable or number.`);
    }

    private parsePrint(): ExpressionNode {
        const operatorLog = this.match(tokenTypesList.LOG);

        if (operatorLog !== null) {
            return new UnarOperationNode(operatorLog, this.parseFormula());
        }

        throw new Error(`On position '${this.position}' expected 'print ->' operator.`);
    }

    private parseParentheses(): ExpressionNode {
        if (this.match(tokenTypesList.LPAR) !== null) {
            const node = this.parseFormula();
            this.require(tokenTypesList.RPAR);
            return node;
        } else {
            return this.parseVariableOrNumber();
        }
    }

    private parseFormula(): ExpressionNode {
        let leftNode = this.parseParentheses();
        let operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS);

        while (operator !== null) {
            const rightNode = this.parseParentheses();
            leftNode = new BinOperationNode(operator, leftNode, rightNode);
            operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS);
        }

        return leftNode;
    }

    private parseExpression(): ExpressionNode {
        if (this.match(tokenTypesList.VARIABLE) == null) {
            const printNode = this.parsePrint();
            return printNode;
        }

        this.position -= 1;
        let variableNode = this.parseVariableOrNumber();
        const assignOperator = this.match(tokenTypesList.ASSIGN);

        if (assignOperator != null) {
            const rightFormulaNode = this.parseFormula();
            const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode);
            return binaryNode;
        }

        throw new Error(`At position '${this.position}', after variable expected operand.`);
    }

    public parseCode(): ExpressionNode {
        const root = new StatementsNode();

        while (this.position < this.tokens.length) {
            const codeStringNode = this.parseExpression();
            this.require(tokenTypesList.SEMICOLON);
            root.addNode(codeStringNode);
        }

        return root;
    }

    public execCode(node: ExpressionNode): any {
        if (node instanceof NumberNode) {
            return parseInt(node.number.text);
        }

        if (node instanceof UnarOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList.LOG.name:
                    console.log(this.execCode(node.operand));
                    return;
            }
        }

        if (node instanceof BinOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList.PLUS.name:
                    return this.execCode(node.leftNode) + this.execCode(node.rightNode);

                case tokenTypesList.MINUS.name:
                    return this.execCode(node.leftNode) - this.execCode(node.rightNode);

                case tokenTypesList.ASSIGN.name:
                    const result = this.execCode(node.rightNode);
                    const variableNode = <VariableNode>node.leftNode;
                    this.scope[variableNode.variable.text] = result;
                    return result;
            }
        }

        if (node instanceof VariableNode) {
            if (this.scope[node.variable.text]) {
                return this.scope[node.variable.text];
            } else {
                throw new Error(`Cannot find variable '${node.variable.text}'.`);
            }
        }

        if (node instanceof StatementsNode) {
            node.codeStrings.forEach(codeString => {
                this.execCode(codeString);
            });
            return;
        }

        throw new Error('Given node type is \'undefined\'.');
    }
}
