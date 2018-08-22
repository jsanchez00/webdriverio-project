const webdriverio = require('webdriverio');
const request = require('request');
const username = 'jsanchez@uxland.es'; 			// the email address associated with your account
const authkey = 'u667f537e8b155df';					// can be found on the "Manage Account" page of our app
const options = {
    desiredCapabilities: {
        name: 'Selenium Test Example',
        build: '1.0',
        browser_api_name: "FF45",
        os_api_name: "Win10",
        browserName: 'firefox',
        record_video: 'true',
        record_network: 'false'
    },
    host: "hub.crossbrowsertesting.com",
    port: 80,
    user: username,
    key: authkey
};

let sessionId;

//Call API to set the score
function setScore(score) {

    let result = { error: false, message: null };

    if (sessionId){

        request({
                method: 'PUT',
                uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
                body: {'action': 'set_score', 'score': score },
                json: true
            },
            function(error, response, body) {
                if (error) {
                    result.error = true;
                    result.message = error;
                }
                else if (response.statusCode !== 200){
                    result.error = true;
                    result.message = body;
                }
                else{
                    result.error = false;
                    result.message = 'success';
                }

            })
            .auth(username, authkey);
    }
    else{
        result.error = true;
        result.message = 'Session Id was not defined';
    }

}

// create your webdriverio.remote with your options as an argument
const browser = webdriverio.remote(options);



const expect = require("chai").expect;
const abecedario = 'TRWAGMYFPDXBNJZSQVHLCKET';

const path = {
    login: 'sgrh-app iron-pages::sgrh-login uxl-busy-indicator::login uxl-login',
    shell: 'sgrh-app iron-pages::sgrh-shell',
    signUp: 'sgrh-app iron-pages::sgrh-sign-up uxl-busy-indicator::sign-up-content'
};

browser
    .init()
    .then(() => sessionId = browser.onRequestHandler.sessionID)
    .url('https://www1.ics.gencat.cat/sgrh20/es6/')

const userNameSelector = `${path.login} #username-input paper-input-container::iron-input::input`;
const passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
const loginButtonSelector = `${path.login} #submit`;

const errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;
browser.setValue(userNameSelector, 'TEST021');
browser.setValue(passwordSelector, '1234567aa');
browser.click(loginButtonSelector);
browser.waitUntil(() => {
    return browser.getText(errorMessageSelector)
}, 5000, 'error message is not showed in 5s');
let errorMessage = browser.getText(errorMessageSelector);
//expect(errorMessage).to.be.equal('Dades d\'accés incorrectes');
setScore('pass');
browser.end();
//
// describe('Login page',  () => {
//     beforeEach(() => {
//         browser
//             .init()
//             .then(() => sessionId = browser.onRequestHandler.sessionID)
//         browser.url('https://www1.ics.gencat.cat/sgrh20/es6/');
//     });
//
//     const userNameSelector = `${path.login} #username-input paper-input-container::iron-input::input`;
//     const passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
//     const loginButtonSelector = `${path.login} #submit`;
//     it('Login Error - After login called, errorMessage must be shown with specific text.', async(done) => {
//         const errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;
//         browser.setValue(userNameSelector, 'TEST021');
//         browser.setValue(passwordSelector, '1234567aa');
//         browser.click(loginButtonSelector);
//         browser.waitUntil(() => {
//             return browser.getText(errorMessageSelector)
//         }, 5000, 'error message is not showed in 5s');
//         let errorMessage = await browser.getText(errorMessageSelector);
//         expect(errorMessage).to.be.equal('Dades d\'accés incorrectes');
//         setScore('pass');
//     });
    //
    // it('Login OK - After login called, must be shown a guide.', () => {
    //     browser.setValue(userNameSelector, 'TEST021');
    //     browser.setValue(passwordSelector, '1234567a');
    //     browser.click(loginButtonSelector);
    //     const guideSelector = `${path.shell} app-header-layout::iron-pages::sgrh-module-container #apps-container::sgrh-guide-view`;
    //     browser.waitForExist(guideSelector, 9000, 'board is not showed in 9s');
    //     expect($(guideSelector)).to.exist;
    // });
// });
//
// describe('Sign-Up Page', () => {
//     beforeEach(() => {
//         browser.windowHandleMaximize();
//         browser.url('/sgrh20/es6/');
//         browser.localStorage('DELETE', 'last-logged-in-user');
//     });
//     it('Sign-Up Process', () => {
//         const goSignUpPageButtonSelector = `${path.login} #signup`;
//         const navigationButtonsSelector = `${path.signUp} navigation-buttons`;
//         const signUpIdPageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-id iron-form::form`;
//         const usernameInputSelector = `${signUpIdPageSelector} paper-input#id paper-input-container::iron-input::input`;
//         const passwordInputSelector = `${signUpIdPageSelector} paper-input#pwd paper-input-container::iron-input::input`;
//         const copyPasswordInputSelector = `${signUpIdPageSelector} paper-input#copy paper-input-container::iron-input::input`;
//         const forwardButtonSelector = `${navigationButtonsSelector} navigation-button-forward paper-icon-button`;
//         const completeButtonSelector = `${navigationButtonsSelector} .actions paper-button`;
//
//         browser.click(goSignUpPageButtonSelector);
//         browser.waitForExist(path.signUp, 5000);
//         expect($(path.signUp)).to.exist;
//
//         expect(browser.isEnabled(forwardButtonSelector)).to.be.false;
//         let documentId = Math.floor(Math.random()*90000000) + 10000000;
//         let posicion = documentId % 23;
//         let letra = abecedario.substring(posicion,posicion+1);
//         browser.setValue(usernameInputSelector, documentId + letra);
//         browser.setValue(passwordInputSelector, '1234567a');
//         browser.setValue(copyPasswordInputSelector, '1234567a');
//         expect(browser.isEnabled(forwardButtonSelector)).to.be.true;
//         browser.saveScreenshot('./screenshots/sign-up-id.png');
//         browser.click(forwardButtonSelector);
//
//         const signUpNamePageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-name iron-form::form`;
//         const nameInputSelector = `${signUpNamePageSelector} paper-input:nth-child(1) paper-input-container::iron-input::input`;
//         const secondNameInputSelector = `${signUpNamePageSelector} paper-input:nth-child(2) paper-input-container::iron-input::input`;
//         browser.setValue(nameInputSelector, 'TestName');
//         browser.setValue(secondNameInputSelector, 'SecondTestName');
//         browser.saveScreenshot('./screenshots/sign-up-name.png');
//         browser.click(forwardButtonSelector);
//
//         const signUpAddressPageSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-address iron-form::form`;
//         const mailInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(2) paper-input-container::iron-input::input`;
//         const addressInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(4) paper-input-container::iron-input::input`;
//         const cpInputSelector = `${signUpAddressPageSelector} paper-input:nth-child(5) paper-input-container::iron-input::input`;
//         browser.setValue(mailInputSelector, 'jsanchez@uxland.es');
//         browser.setValue(addressInputSelector, 'C/ Josep Vicenç Foix');
//         browser.setValue(cpInputSelector, '08338');
//         browser.saveScreenshot('./screenshots/sign-up-address.png');
//         browser.waitUntil(() => {
//             let isDisabled = browser.getAttribute(forwardButtonSelector, 'disabled');
//             return !isDisabled;
//         }, 5000, 'forward button is disabled in 5s');
//         browser.click(forwardButtonSelector);
//
//         const signUpAdditionalDataSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-additional-data iron-form::form`;
//         const dayInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #day paper-input-container::iron-input::input`;
//         const monthInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #month paper-input-container::iron-input::input`;
//         const yearInputSelector = `${signUpAdditionalDataSelector} birth-date-selection #year paper-input-container::iron-input::input`;
//
//         browser.setValue(dayInputSelector, '18');
//         browser.setValue(monthInputSelector, '11');
//         browser.setValue(yearInputSelector, '1990');
//         browser.saveScreenshot('./screenshots/sign-up-additional-data.png');
//         browser.click(forwardButtonSelector);
//
//         const signUpGdprSelector = `${path.signUp} skeleton-carousel::sgrh-sign-up-gdpr iron-form::form`;
//         const checkboxSelector =  `${signUpGdprSelector} paper-checkbox`;
//         browser.execute(function() {
//             let sgrhSignUpGdprContainer = document.querySelector('sgrh-app').shadowRoot.querySelector('sgrh-sign-up').shadowRoot.querySelector('sgrh-sign-up-gdpr');
//             let paperCheckBox = sgrhSignUpGdprContainer.shadowRoot.querySelector('paper-checkbox');
//             sgrhSignUpGdprContainer.scrollTop += (<any>paperCheckBox).offsetTop;
//         });
//         browser.click(checkboxSelector);
//         browser.saveScreenshot('./screenshots/sign-up-gdpr.png');
//         browser.click(completeButtonSelector);
//         browser.pause(5000);
//         browser.saveScreenshot('./screenshots/sign-up-completed.png');
//     });
//
// });






//
//
//
// browser
//     .init()
//     .then(function() {
//         sessionId = client.requestHandler.sessionID;
//     })
//     .url('http://www.google.com')
//     .getTitle().then(function(title) {
//     if (title === 'Google') {
//         setScore('pass');
//     } else {
//         setScore('fail');
//     }
// })
//     .end();