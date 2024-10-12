import InputService from './src/inputService/index.js';
import UsernameParser from './src/usernameParserService/index.js';


class App {
    constructor(username) {
        this.inputService = new InputService(username);
    }

    start() {
        this.inputService.start();
    }
}
const username = new UsernameParser().getUsername();
const myApp = new App(username);
myApp.start();


