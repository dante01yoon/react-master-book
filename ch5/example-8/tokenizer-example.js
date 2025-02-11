"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var sourceCode = "\nfunction greet(name: string) {\n    return \"Hello, \" + name;\n}\n";
// Create a scanner for tokenization
var scanner = ts.createScanner(ts.ScriptTarget.Latest, 
/* skipTrivia */ false, ts.LanguageVariant.Standard, sourceCode);
// Function to get all tokens
function getAllTokens() {
    var tokens = [];
    scanner.setText(sourceCode);
    var token = scanner.scan();
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
var tokens = getAllTokens();
tokens.forEach(function (token) {
    console.log("{ kind: ".concat(ts.SyntaxKind[token.kind], ", text: \"").concat(token.text.replace(/\n/g, '\\n'), "\"}"));
});
/**
[
    { kind: SyntaxKind.FunctionKeyword, text: "function" },
    { kind: SyntaxKind.Identifier, text: "greet" },
    { kind: SyntaxKind.OpenParenToken, text: "(" },
    { kind: SyntaxKind.Identifier, text: "name" },
    { kind: SyntaxKind.ColonToken, text: ":" },
    { kind: SyntaxKind.StringKeyword, text: "string" },
    { kind: SyntaxKind.CloseParenToken, text: ")" },
    { kind: SyntaxKind.OpenBraceToken, text: "{" },
    { kind: SyntaxKind.ReturnKeyword, text: "return" },
    { kind: SyntaxKind.StringLiteral, text: "\"Hello, \"" },
    { kind: SyntaxKind.PlusToken, text: "+" },
    { kind: SyntaxKind.Identifier, text: "name" },
    { kind: SyntaxKind.SemicolonToken, text: ";" },
    { kind: SyntaxKind.CloseBraceToken, text: "}" }
]
 */ 
