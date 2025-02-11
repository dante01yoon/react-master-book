"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var sourceCode = "\nfunction greet(name: string) {\n    return \"Hello, \" + name;\n}\n";
// 토큰화를 위한 스캐너 생성
var scanner = ts.createScanner(ts.ScriptTarget.Latest, 
/* skipTrivia */ false, ts.LanguageVariant.Standard, sourceCode);
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
// 토큰 출력
var tokens = getAllTokens();
tokens.forEach(function (token) {
    console.log("{ kind: ".concat(ts.SyntaxKind[token.kind], ", text: \"").concat(token.text.replace(/\n/g, '\\n'), "\"}"));
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
