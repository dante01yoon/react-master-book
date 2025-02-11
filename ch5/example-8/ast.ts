// TypeScript 코드를 AST로 파싱하는 예제
import * as ts from "typescript";

// 파싱할 TypeScript 코드
const sourceCode = `
function greet(name: string) {
    return "Hello, " + name;
}
`;


const sourceFile = ts.createSourceFile( // 소스 파일 생성 SourceFileObject 타입
    "example.ts",
    sourceCode,
    ts.ScriptTarget.Latest,
    true
);

function printNode(node: ts.Node, indent: string = "") { // AST를 순회하면서 노드 정보 출력하는 함수
    console.log(indent + ts.SyntaxKind[node.kind]);
    
    node.forEachChild(child => printNode(child, indent + "  "));
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
