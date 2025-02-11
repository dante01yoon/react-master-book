import * as ts from "typescript";

// 토큰화할 소스 코드
const sourceCode = `
function greet(name: string) {
    return "Hello, " + name;
}
`;

// 토큰화를 위한 스캐너 생성
const scanner = ts.createScanner(
    ts.ScriptTarget.Latest, // 최신 스크립트 타겟
    /* skipTrivia */ false, // 줄바꿈 문자를 출력하기 위해 줄바꿈 문자를 이스케이프 처리
    ts.LanguageVariant.Standard, // 표준 언어 변형
    sourceCode // 토큰화할 소스 코드
);

function getAllTokens() { // 모든 토큰을 가져오는 함수
    const tokens: { kind: ts.SyntaxKind; text: string }[] = [];
    
    scanner.setText(sourceCode);
    let token = scanner.scan(); // 첫 번째 토큰을 가져옵니다.
    
    while (token !== ts.SyntaxKind.EndOfFileToken) { // 파일의 끝에 도달할 때까지 반복
        tokens.push({ // 토큰 정보를 배열에 추가
            kind: token, // 토큰 종류
            text: scanner.getTokenText() // 토큰 텍스트를 가져옵니다.
        });
        token = scanner.scan(); // 다음 토큰을 가져옵니다.
    }
    
    return tokens;
}

// 토큰 출력
const tokens = getAllTokens();
tokens.forEach(token => {
    console.log(`{ kind: ${ts.SyntaxKind[token.kind]}, text: "${token.text.replace(/\n/g, '\\n')}"}`); // 줄바꿈 문자를 출력하기 위해 줄바꿈 문자를 이스케이프 처리
});


/**
 * 출력 결과
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