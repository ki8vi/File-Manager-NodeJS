import CONSTANTS from "../constants/index.js";
import { EOL } from 'node:os';

export default class MessageService {
    constructor(username) {
        this.username = username;
    }

    showGreet() {
        console.log(`${CONSTANTS.GREET_MESSAGE}, ${this.username}!${EOL}`);
    }

    showBye() {
        console.log(`${CONSTANTS.BYE_MESSAGE}, ${this.username}, goodbye!${EOL}`);
    }

    showCurrentDirectory(path) {
        console.log(`${CONSTANTS.PATH_NOTIFICATION} ${path}${EOL}`);
    }

    showOpearationFailedMsg() {
        console.error(CONSTANTS.FAILED_MESSAGE);
    }

    showInvalidInputMsg() {
        console.error(CONSTANTS.INVALID_INPUT_MESSAGE);
    }
}