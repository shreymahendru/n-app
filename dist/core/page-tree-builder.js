"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_1 = require("./page");
class PageTreeBuilder {
    constructor(root, pageRegistrations) {
        n_defensive_1.given(root, "root").ensureHasValue();
        n_defensive_1.given(pageRegistrations, "pageRegistrations").ensureHasValue();
        this._root = root;
        this._registrations = pageRegistrations;
    }
    build() {
        this.buildTree();
        return this.shakeTree();
    }
    buildTree() {
        for (let registration of this._registrations) {
            let currentNode = this._root;
            for (let segment of registration.route.pathSegments) {
                if (segment === currentNode.segment)
                    continue;
                let node = currentNode.children.find(t => t.segment === segment);
                if (!node)
                    node = new page_1.Page(segment, currentNode);
                currentNode = node;
            }
            currentNode.attachRegistration(registration);
        }
    }
    shakeTree() {
        let nodesToProcess = new Array();
        // skip root
        nodesToProcess.push(...this._root.children);
        while (nodesToProcess.length > 0) {
            let currentNode = nodesToProcess.shift();
            let children = currentNode.children;
            if (!currentNode.registration) {
                for (let child of children)
                    child.changeParent(currentNode.parent);
            }
            nodesToProcess.push(...children);
        }
        if (this._root.registration)
            return [this._root];
        let children = this._root.children;
        for (let child of children)
            child.changeParent(null);
        return children;
    }
}
exports.PageTreeBuilder = PageTreeBuilder;
//# sourceMappingURL=page-tree-builder.js.map