"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript 코드를 AST로 파싱하는 예제
var ts = require("typescript");
// 파싱할 TypeScript 코드
var sourceCode = "\nfunction greet(name: string) {\n    return \"Hello, \" + name;\n}\n";
var sourceFile = ts.createSourceFile(// 소스 파일 생성
"example.ts", sourceCode, ts.ScriptTarget.Latest, true);
console.log(sourceFile);
function printNode(node, indent) {
    if (indent === void 0) { indent = ""; }
    console.log(indent + ts.SyntaxKind[node.kind]);
    node.forEachChild(function (child) { return printNode(child, indent + "  "); });
}
console.log("AST 구조:"); // AST 출력
printNode(sourceFile);
/* 출력 결과:
AST 구조:
SourceFile
  FunctionDeclaration
    Identifier (greet)
    Parameter
      Identifier (name)
      TypeReference
        Identifier (string)
    Block
      ReturnStatement
        BinaryExpression
          StringLiteral ("Hello, ")
          Identifier (name)
  EndOfFileToken
*/
