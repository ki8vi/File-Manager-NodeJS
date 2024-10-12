import InputService from './src/inputService/index.js';
import UsernameParser from './src/usernameParserService/index.js';


class AppController {
    constructor(username) {
        this.inputService = new InputService(username);
    }

    start() {
        this.inputService.start();
    }
}
const username = new UsernameParser().getUsername();
const myApp = new AppController(username);
myApp.start();


