import CONSTANTS from "../constants/index.js";

export default class MessageService {
    constructor(username) {
        this.username = username;
    }

    showGreet() {
        console.log(`${CONSTANTS.GREET_MESSAGE}, ${this.username}!`);
    }

    showBye() {
        console.log(`${CONSTANTS.BYE_MESSAGE}, ${this.username}, goodbye!`);
    }

    showCurrentDirectory(path) {
        console.log(`${CONSTANTS.PATH_NOTIFICATION} ${path}`);
    }
}