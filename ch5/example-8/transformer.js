"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function createTransformer() {
    return function (context) {
        return function (sourceFile) {
            function visit(node) {
                // Remove type annotations from parameters
                if (ts.isParameter(node)) {
                    return ts.factory.createParameterDeclaration(node.decorators, node.modifiers, node.dotDotDotToken, node.name, undefined, // Remove question token
                    undefined, // Remove type annotation
                    node.initializer);
                }
                // Remove type annotations from variable declarations
                if (ts.isVariableDeclaration(node)) {
                    return ts.factory.createVariableDeclaration(node.name, undefined, // Remove type annotation
                    undefined, // Remove type annotation
                    node.initializer);
                }
                // Remove return type annotations from functions
                if (ts.isFunctionDeclaration(node)) {
                    return ts.factory.createFunctionDeclaration(node.decorators, node.modifiers, node.asteriskToken, node.name, undefined, // Remove type parameters
                    node.parameters.map(function (p) { return visit(p); }), // Remove parameter types
                    undefined, // Remove return type
                    node.body);
                }
                // Remove interface declarations
                if (ts.isInterfaceDeclaration(node)) {
                    return undefined;
                }
                // Remove type alias declarations
                if (ts.isTypeAliasDeclaration(node)) {
                    return undefined;
                }
                return ts.visitEachChild(node, visit, context);
            }
            return ts.visitNode(sourceFile, visit);
        };
    };
}
// Compile and emit
function compile(sourceCode, fileName) {
    if (fileName === void 0) { fileName = "example.ts"; }
    var compilerOptions = {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
    };
    var sourceFile = ts.createSourceFile(fileName, sourceCode, compilerOptions.target, true);
    // Apply transformation
    var transformer = createTransformer();
    var result = ts.transform(sourceFile, [transformer]);
    var transformedSourceFile = result.transformed[0];
    // Emit the transformed code
    var printer = ts.createPrinter();
    var output = printer.printFile(transformedSourceFile);
    return output;
}
// Example usage
var sourceCode = "\ninterface Person {\n    name: string;\n    age: number;\n}\n\ntype ID = string | number;\n\nfunction greet(person: Person): string {\n    const message: string = \"Hello, \" + person.name;\n    return message;\n}\n";
var transformedCode = compile(sourceCode);
console.log("Transformed code:");
console.log(transformedCode);
/* 출력 결과
Transformed code:
function greet(person: Person): string {
    const message: string = "Hello, " + person.name;
    return message;
} 
