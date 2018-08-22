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
        loginPage_1.default.loginAction('047725797S', '1234567aa');
        browser.waitUntil(() => {
            return browser.getText(loginPage_1.default.errorMessageSelector);
        }, 20000, 'error message is not showed in 20s');
        expect(browser.getText(loginPage_1.default.errorMessageSelector)).to.be.equal('Dades d\'accés incorrectes');
    });
    it('Login OK - After login called, must be shown a guide.', () => {
        loginPage_1.default.loginAction('047725797S', '32463');
        const guideSelector = `${path.shell} app-header-layout::iron-pages::sgrh-module-container #apps-container::sgrh-guide-view`;
        browser.waitForExist(guideSelector, 20000, 'board is not showed in 9s');
        expect($(guideSelector)).to.exist;
    });
});
describe('Sign-Up Page', () => {
    beforeEach(() => {
        browser.windowHandleMaximize();
        browser.url('/sgrh20/es6/');
        browser.localStorage('DELETE', 'last-logged-in-user');
    });
    it('Sign-Up Process', () => {
        const userChangedButtonSelector = `${path.login} #log-other-user`;
        const goSignUpPageButtonSelector = `${path.login} #signup`;
        const navigationButtonsSelector = `${path.signUp} navigation-buttons`;
        const signUpIdPageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-id iron-form::form`;
        const usernameInputSelector = `${signUpIdPageSelector} paper-input#id paper-input-container::iron-input::input`;
        const passwordInputSelector = `${signUpIdPageSelector} paper-input#pwd paper-input-container::iron-input::input`;
        const copyPasswordInputSelector = `${signUpIdPageSelector} paper-input#copy paper-input-container::iron-input::input`;
        const forwardButtonSelector = `${navigationButtonsSelector} navigation-button-forward paper-icon-button`;
        const completeButtonSelector = `${navigationButtonsSelector} .actions paper-button`;
        if (browser.isExisting(userChangedButtonSelector)) {
            browser.click(userChangedButtonSelector);
        }
        browser.click(goSignUpPageButtonSelector);
        browser.waitForExist(path.signUp, 5000);
        expect($(path.signUp)).to.exist;
        console.log('************************************************');
        console.log(browser.isVisible(forwardButtonSelector));
        console.log(browser.isEnabled(forwardButtonSelector));
        console.log('************************************************');
        browser.saveScreenshot('./screenshots/isenabled.png');
        expect(browser.getAttribute(forwardButtonSelector, 'disabled')).to.be.equal('true');
        let documentId = Math.floor(Math.random() * 90000000) + 10000000;
        let posicion = documentId % 23;
        let letra = abecedario.substring(posicion, posicion + 1);
        browser.setValue(usernameInputSelector, documentId + letra);
        browser.setValue(passwordInputSelector, '1234567a');
        browser.setValue(copyPasswordInputSelector, '1234567a');
        expect(browser.isEnabled(forwardButtonSelector)).to.be.true;
        browser.saveScreenshot('./screenshots/sign-up-id.png');
        browser.click(forwardButtonSelector);
        const signUpNamePageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-name iron-form::form`;
        const nameInputSelector = `${signUpNamePageSelector} paper-input:nth-child(1) paper-input-container::iron-input::input`;
        const secondNameInputSelector = `${signUpNamePageSelector} paper-input:nth-child(2) paper-input-container::iron-input::input`;
        browser.setValue(nameInputSelector, 'TestName');
        browser.setValue(secondNameInputSelector, 'SecondTestName');
        browser.saveScreenshot('./screenshots/sign-up-name.png');
        browser.click(forwardButtonSelector);
        const signUpAddressPageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-address iron-form::form`;
        const mailInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(2) paper-input-container::iron-input::input`;
        const addressInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(4) paper-input-container::iron-input::input`;
        const cpInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(5) paper-input-container::iron-input::input`;
        browser.setValue(mailInputSelector, 'jsanchez@uxland.es');
        browser.setValue(addressInputSelector, 'C/ Josep Vicenç Foix');
        browser.setValue(cpInputSelector, '08338');
        browser.saveScreenshot('./screenshots/sign-up-address.png');
        browser.waitUntil(() => {
            let isDisabled = browser.getAttribute(forwardButtonSelector, 'disabled');
            return !isDisabled;
        }, 20000, 'forward button is disabled in 5s');
        browser.click(forwardButtonSelector);
        const signUpAdditionalDataSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-additional-data iron-form::form`;
        const dayInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #day paper-input-container::iron-input::input`;
        const monthInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #month paper-input-container::iron-input::input`;
        const yearInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #year paper-input-container::iron-input::input`;
        browser.setValue(dayInputSelector, '18');
        browser.setValue(monthInputSelector, '11');
        browser.setValue(yearInputSelector, '1990');
        browser.saveScreenshot('./screenshots/sign-up-additional-data.png');
        browser.click(forwardButtonSelector);
        const signUpGdprSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-gdpr iron-form::form`;
        const checkboxSelector = `${signUpGdprSelector} paper-checkbox`;
        browser.execute(function () {
            let sgrhSignUpGdprContainer = document.querySelector('sgrh-app').shadowRoot.querySelector('sgrh-sign-up').shadowRoot.querySelector('sgrh-sign-up-gdpr');
            let paperCheckBox = sgrhSignUpGdprContainer.shadowRoot.querySelector('paper-checkbox');
            sgrhSignUpGdprContainer.scrollTop += paperCheckBox.offsetTop;
        });
        browser.click(checkboxSelector);
        browser.saveScreenshot('./screenshots/sign-up-gdpr.png');
        browser.click(completeButtonSelector);
        browser.saveScreenshot('./screenshots/sign-up-completed.png');
    });
});
//# sourceMappingURL=index.js.map