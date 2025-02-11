import * as ts from "typescript";

// 파싱할 TypeScript 코드
const sourceCode = `
function greet(name: string) {
    return "Hello, " + name;
}
`;


const sourceFile = ts.createSourceFile( // 메모리에서만 사용하는 소스 파일을 생성합니다. 실제로 파일이 생성되지는 않습니다.
    "example.ts", // 파일 이름
    sourceCode, // 파싱할 소스 코드
    ts.ScriptTarget.Latest, // 최신 스크립트 타겟
    true // 소스 파일이 메모리에서만 사용되는지 여부
);

function printNode(node: ts.Node, indent: string = "") { // AST를 순회하면서 노드 정보 출력하는 함수
    console.log(indent + ts.SyntaxKind[node.kind]); // 노드 종류를 출력합니다.
    
    node.forEachChild(child => printNode(child, indent + "  ")); // 자식 노드를 순회하면서 노드 정보를 출력합니다.
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
