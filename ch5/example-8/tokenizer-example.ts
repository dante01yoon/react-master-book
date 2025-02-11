import * as ts from "typescript";

const sourceCode = `
function greet(name: string) {
    return "Hello, " + name;
}
`;

// Create a scanner for tokenization
const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    /* skipTrivia */ false,
    ts.LanguageVariant.Standard,
    sourceCode
);

// Function to get all tokens
function getAllTokens() {
    const tokens: { kind: ts.SyntaxKind; text: string }[] = [];
    
    scanner.setText(sourceCode);
    let token = scanner.scan();
    
    while (token !== ts.SyntaxKind.EndOfFileToken) {
        tokens.push({
            kind: token,
            text: scanner.getTokenText()
        });
        token = scanner.scan();
    }
    
    return tokens;
}

// Print tokens
const tokens = getAllTokens();
tokens.forEach(token => {
    console.log(`{ kind: ${ts.SyntaxKind[token.kind]}, text: "${token.text.replace(/\n/g, '\\n')}"}`);
});

/**
{ kind: NewLineTrivia, text: "\n"}
{ kind: FunctionKeyword, text: "function"}
{ kind: WhitespaceTrivia, text: " "}
{ kind: Identifier, text: "greet"}
{ kind: OpenParenToken, text: "("}
{ kind: Identifier, text: "name"}
{ kind: ColonToken, text: ":"}
{ kind: WhitespaceTrivia, text: " "}
{ kind: StringKeyword, text: "string"}
{ kind: CloseParenToken, text: ")"}
{ kind: WhitespaceTrivia, text: " "}
{ kind: FirstPunctuation, text: "{"}
{ kind: NewLineTrivia, text: "\n"}
{ kind: WhitespaceTrivia, text: "    "}
{ kind: ReturnKeyword, text: "return"}
{ kind: WhitespaceTrivia, text: " "}
{ kind: StringLiteral, text: ""Hello, ""}
{ kind: WhitespaceTrivia, text: " "}
{ kind: PlusToken, text: "+"}
{ kind: WhitespaceTrivia, text: " "}
{ kind: Identifier, text: "name"}
{ kind: SemicolonToken, text: ";"}
{ kind: NewLineTrivia, text: "\n"}
{ kind: CloseBraceToken, text: "}"}
{ kind: NewLineTrivia, text: "\n"}
 */