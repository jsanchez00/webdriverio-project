"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginPage_1 = require("./classPages/loginPage");
const expect = require("chai").expect;
const abecedario = 'TRWAGMYFPDXBNJZSQVHLCKET';
const path = {
    login: 'sgrh-app iron-pages::sgrh-login uxl-busy-indicator::login uxl-login',
    shell: 'sgrh-app iron-pages::sgrh-shell',
    signUp: 'sgrh-app iron-pages::sgrh-sign-up uxl-busy-indicator::sign-up-content'
};
describe('Login page', () => {
    beforeEach(() => {
        browser.windowHandleMaximize();
        loginPage_1.default.open();
        loginPage_1.default.waitForLoaded();
    });
    it('Login Error - After login called, errorMessage must be shown with specific text.', () => {
        expect(browser.getText(loginPage_1.default.errorMessageSelector)).to.be.empty;
        loginPage_1.default.loginAction('070890740W', '1234567aa');
        browser.waitUntil(() => {
            return browser.getText(loginPage_1.default.errorMessageSelector);
        }, 20000, 'error message is not showed in 20s');
        expect(browser.getText(loginPage_1.default.errorMessageSelector)).to.be.equal('Dades d\'accés incorrectes');
    });
    it('Login OK - After login called, must be shown a guide.', () => {
        loginPage_1.default.loginAction('070890740W', '1234567a');
        const guideSelector = `${path.shell} app-header-layout::iron-pages::sgrh-module-container #apps-container::sgrh-guide-view`;
        browser.waitForExist(guideSelector, 20000, 'board is not showed in 9s');
        expect($(guideSelector)).to.exist;
    });
});
//# sourceMappingURL=index.js.map