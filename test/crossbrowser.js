const webdriverio = require('webdriverio');
const request = require('request');
const username = 'jsanchez@uxland.es';
const authkey = 'u667f537e8b155df';
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
function setScore(score) {
    let result = { error: false, message: null };
    if (sessionId) {
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: { 'action': 'set_score', 'score': score },
            json: true
        }, function (error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200) {
                result.error = true;
                result.message = body;
            }
            else {
                result.error = false;
                result.message = 'success';
            }
        })
            .auth(username, authkey);
    }
    else {
        result.error = true;
        result.message = 'Session Id was not defined';
    }
}
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
    .url('https://www1.ics.gencat.cat/sgrh20/es6/');
const userNameSelector = `${path.login} #username-input paper-input-container::iron-input::input`;
const passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
const loginButtonSelector = `${path.login} #submit`;
const errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;
browser.setValue(userNameSelector, 'TEST021');
browser.setValue(passwordSelector, '1234567aa');
browser.click(loginButtonSelector);
browser.waitUntil(() => {
    return browser.getText(errorMessageSelector);
}, 5000, 'error message is not showed in 5s');
let errorMessage = browser.getText(errorMessageSelector);
setScore('pass');
browser.end();
//# sourceMappingURL=crossbrowser.js.map