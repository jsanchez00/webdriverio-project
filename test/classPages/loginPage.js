"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPage_1 = require("./defaultPage");
const path = {
    login: 'sgrh-app iron-pages::sgrh-login uxl-busy-indicator::login uxl-login',
    shell: 'sgrh-app iron-pages::sgrh-shell',
    signUp: 'sgrh-app iron-pages::sgrh-sign-up uxl-busy-indicator::sign-up-content'
};
class LoginPage extends defaultPage_1.default {
    constructor() {
        super(...arguments);
        this.usernameSelector = `${path.login} #username-input paper-input-container::iron-input::input`;
        this.passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
        this.submitButtonSelector = `${path.login} #submit`;
        this.errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;
    }
    open() {
        super.open('/sgrh20/es6/');
    }
    submit() {
        browser.click(this.submitButtonSelector);
    }
    waitForLoaded() {
        browser.waitForExist(`${path.login} #username-input paper-input-container::iron-input::input`, 20000, 'username input is not showed in 20s');
    }
    loginAction(user, pwd) {
        browser.setValue(this.usernameSelector, user);
        browser.setValue(this.passwordSelector, pwd);
        this.submit();
    }
}
exports.default = new LoginPage();
//# sourceMappingURL=loginPage.js.map