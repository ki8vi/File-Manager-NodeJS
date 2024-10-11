import CONSTANTS from "../constants";

export class MessageService {
    constructor(username) {
        this.username = username;
    }

    showGreet() {
        return `${CONSTANTS.GREET_USER}, ${this.username}!`;
    }

    showBye() {
        return `${CONSTANTS.BYE_MESSAGE}, ${this.username}, goodbye!`;
    }
}