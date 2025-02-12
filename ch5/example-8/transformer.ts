import * as ts from "typescript";

function createTransformer(): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            function visit(node: ts.Node): ts.Node {
                // Remove type annotations from parameters
                if (ts.isParameter(node)) {
                    return ts.factory.createParameterDeclaration(
                        node.modifiers,
                        node.dotDotDotToken,
                        node.name,
                        undefined, // question token
                        undefined, // type
                        node.initializer
                    );
                }

                // Remove type annotations from variable declarations
                if (ts.isVariableDeclaration(node)) {
                    return ts.factory.createVariableDeclaration(
                        node.name,
                        undefined, // Remove type annotation
                        undefined, // Remove type annotation
                        node.initializer
                    );
                }

                // Remove return type annotations from functions
                if (ts.isFunctionDeclaration(node)) {
                    return ts.factory.createFunctionDeclaration(
                        node.modifiers,
                        node.asteriskToken,
                        node.name,
                        [], // type parameters
                        node.parameters.map(p => visit(p) as ts.ParameterDeclaration),
                        undefined, // return type
                        node.body
                    );
                }

                // Remove interface declarations
                if (ts.isInterfaceDeclaration(node)) {
                    return undefined!;
                }

                // Remove type alias declarations
                if (ts.isTypeAliasDeclaration(node)) {
                    return undefined!;
                }

                return ts.visitEachChild(node, visit, context);
            }

            return ts.visitNode(sourceFile, visit) as ts.SourceFile;
        };
    };
}

// Compile and emit
function compile(sourceCode: string, fileName: string = "example.ts") {
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
    };

    const sourceFile = ts.createSourceFile(
        fileName,
        sourceCode,
        compilerOptions.target!,
        true
    );

    // Apply transformation
    const transformer = createTransformer();
    const result = ts.transform(sourceFile, [transformer]);
    const transformedSourceFile = result.transformed[0];

    // Emit the transformed code
    const printer = ts.createPrinter();
    const output = printer.printFile(transformedSourceFile);

    return output;
}

// Example usage
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

const transformedCode = compile(sourceCode);
console.log("Transformed code:");
console.log(transformedCode);

/* 출력 결과
Transformed code:
function greet(person: Person): string {
    const message: string = "Hello, " + person.name;
    return message;
}
*/