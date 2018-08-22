var webdriverio = require('webdriverio');
var request = require('request');

var username = 'jordisanchez00@gmail.com'; 			// the email address associated with your account
var authkey = 'u7a2247ec2854852';					// can be found on the "Manage Account" page of our app
var options = {
    desiredCapabilities: {
        name: 'Selenium Test Example',
        build: '1.0',
        browser_api_name: "FF61",
        os_api_name: "Win10",
        browserName: 'firefox',
        record_video: 'true',
        record_network: 'true'
    },
    host: "hub.crossbrowsertesting.com",
    port: 80,
    user: username,
    key: authkey
};

var sessionId;

//Call API to set the score
function setScore(score) {

    var result = { error: false, message: null }

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
var client = webdriverio.remote(options);
var path = {
    login: 'sgrh-app iron-pages::sgrh-login uxl-busy-indicator::login uxl-login',
    shell: 'sgrh-app iron-pages::sgrh-shell',
    signUp: 'sgrh-app iron-pages::sgrh-sign-up uxl-busy-indicator::sign-up-content'
};

const userNameSelector = `${path.login} #username-input paper-input-container::iron-input::input`;
const passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
const loginButtonSelector = `${path.login} #submit`;
const errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;
const run = async () => {
    await client.init();
    sessionId = client.requestHandler.sessionID;
    client.url('https://www1.ics.gencat.cat/sgrh20/es6/');
    await client.waitForExist('uxl-login #input-2 input', 40000, 'error');
    client.setValue('uxl-login #input-2 input', 'TEST021');
    client.pause(5000);
    //client.setValue(passwordSelector, '1234567a');
    //client.click(loginButtonSelector);
    client.end();
};

run();
// client.init()
//     .then(function() {
//         sessionId = client.requestHandler.sessionID;
//     })
//     .url('https://www1.ics.gencat.cat/sgrh20/es6/')
//     .waitForExist('sgrh-app', 40000, 'error').then((r) => {
//         alert(r);
//     })
//     .setValue(userNameSelector, 'TEST021')
//     .end();