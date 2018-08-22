// login.page.js
import Page from './defaultPage';
const path = {
    login: 'sgrh-app iron-pages::sgrh-login uxl-busy-indicator::login uxl-login',
    shell: 'sgrh-app iron-pages::sgrh-shell',
    signUp: 'sgrh-app iron-pages::sgrh-sign-up uxl-busy-indicator::sign-up-content'
};

class LoginPage extends Page {

    private usernameSelector =`${path.login} #username-input paper-input-container::iron-input::input`;
    private passwordSelector = `${path.login} #password paper-input-container::iron-input::input`;
    private submitButtonSelector =`${path.login} #submit`;
    public errorMessageSelector = `${path.login} .message-authentication-container .message-authentication`;

    public open() {
        super.open('/sgrh20/es6/');
    }

    public submit() {
        browser.click(this.submitButtonSelector);
    }

    public waitForLoaded(){
        browser.waitForExist(`${path.login} #username-input paper-input-container::iron-input::input`, 20000, 'username input is not showed in 20s');
    }

    public loginAction(user: string, pwd: string){
        browser.setValue(this.usernameSelector, user);
        browser.setValue(this.passwordSelector, pwd);
        this.submit();
    }

}

export default new LoginPage();