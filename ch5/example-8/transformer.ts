import * as ts from "typescript";

function createTransformer(): ts.TransformerFactory<ts.SourceFile> { // 타입스크립트 트랜스포머 팩토리 함수
    return (context: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            function visit(node: ts.Node): ts.Node {
                // 매개변수에서 타입 어노테이션 제거
                if (ts.isParameter(node)) {
                    return ts.factory.createParameterDeclaration(
                        node.modifiers, // 매개변수의 수정자(public, private 등) 유지
                        node.dotDotDotToken, // rest 파라미터(...) 토큰 유지
                        node.name, // 매개변수 이름 유지
                        undefined, // 선택적 매개변수(?) 토큰 제거
                        undefined, // 타입 어노테이션 제거
                        node.initializer // 기본값 유지
                    );
                }

                // 변수 선언에서 타입 어노테이션 제거
                if (ts.isVariableDeclaration(node)) {
                    return ts.factory.createVariableDeclaration(
                        node.name, // 변수명 유지
                        undefined, // 타입 어노테이션 제거
                        undefined, // 타입 어노테이션 제거
                        node.initializer // 초기값 유지
                    );
                }

                // 함수에서 반환 타입 어노테이션 제거
                if (ts.isFunctionDeclaration(node)) {
                    return ts.factory.createFunctionDeclaration(
                        node.modifiers, // 함수 수정자 유지
                        node.asteriskToken, // 제너레이터 함수 표시(*) 유지
                        node.name, // 함수명 유지
                        [], // 타입 매개변수 제거
                        node.parameters.map(p => visit(p) as ts.ParameterDeclaration), // 각 매개변수 재귀적으로 처리
                        undefined, // 반환 타입 제거
                        node.body // 함수 본문 유지
                    );
                }

                // 인터페이스 선언 제거
                if (ts.isInterfaceDeclaration(node)) {
                    return undefined!;
                }

                // 타입 별칭 선언 제거
                if (ts.isTypeAliasDeclaration(node)) {
                    return undefined!;
                }

                return ts.visitEachChild(node, visit, context); // 자식 노드들에 대해 재귀적으로 변환 수행
            }

            return ts.visitNode(sourceFile, visit) as ts.SourceFile;
        };
    };
}

function compile(sourceCode: string, fileName: string = "example.ts") { // 컴파일 함수
    const compilerOptions: ts.CompilerOptions = { // 컴파일러 옵션  
        target: ts.ScriptTarget.ES2020, // 타입스크립트 버전
        module: ts.ModuleKind.CommonJS, // 모듈 시스템
    };

    const sourceFile = ts.createSourceFile(
        fileName,
        sourceCode,
        compilerOptions.target!,
        true
    );

    const transformer = createTransformer(); // 트랜스포머 생성
    const result = ts.transform(sourceFile, [transformer]); // 소스 파일 변환
    const transformedSourceFile = result.transformed[0]; // 변환된 소스 파일

    const printer = ts.createPrinter(); // 프린터 생성
    const output = printer.printFile(transformedSourceFile); // 변환된 소스 파일 출력

    return output;
}

// 예제 코드
const sourceCode = ` 
interface Person {
    name: string;
    age: number;
}

type ID = string | number;

function greet(person: Person): string {
    const message: string = "Hello, " + person.name;
    return message;
}
`;

const transformedCode = compile(sourceCode); // 변환된 코드
console.log("Transformed code:");
console.log(transformedCode);

/* 출력 결과
Transformed code:
function greet(person: Person): string {
    const message: string = "Hello, " + person.name;
    return message;
}
*/