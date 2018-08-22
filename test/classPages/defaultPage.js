"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Page {
    constructor() {
        this.title = 'My Page';
    }
    open(path) {
        browser.url(path);
    }
}
exports.default = Page;
//# sourceMappingURL=defaultPage.js.map