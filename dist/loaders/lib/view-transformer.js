"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRenderFns = void 0;
const function_node_1 = require("./function-node");
function transformRenderFns(renderFn, context, viewModelClassName) {
    renderFn = renderFn.replaceAll(",\r", ", ").replaceAll(",\n", ", ").replaceAll(",\r\n", ", ")
        .replaceAll("(\r", "(").replaceAll("(\n", "(").replaceAll("(\r\n", "(")
        .replaceAll(/[a-zA-Z0-9_]\\n/ig, ";");
    while (renderFn.contains("  "))
        renderFn = renderFn.replaceAll("  ", " ");
    renderFn = renderFn.replaceAll("_c( ", "_c(");
    const node = new function_node_1.FunctionNode(renderFn, 0, viewModelClassName);
    node.preProcess();
    node.regenerate(context);
    return node.toModdedCode();
}
exports.transformRenderFns = transformRenderFns;
//# sourceMappingURL=view-transformer.js.map