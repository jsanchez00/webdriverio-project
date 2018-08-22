export default class Page {
    title: string;
    constructor() {
        this.title = 'My Page';
    }

    open(path) {
        browser.url(path);
    }
}