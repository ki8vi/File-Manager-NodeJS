import CONSTANTS from "../constants/index.js";
import { EOL } from 'node:os';

export default class MessageService {
    constructor(username) {
        this.username = username;
    }

    showGreet() {
        console.log(`${EOL}${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_LIGHT}${CONSTANTS.GREET_MESSAGE}, ${CONSTANTS.ANSI_COLOR_PURPLE}${this.username}${CONSTANTS.ANSI_COLOR_LIGHT}!${CONSTANTS.ANSI_RESET}`);
    }

    showBye() {
        console.log(`${EOL}${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_LIGHT}${CONSTANTS.BYE_MESSAGE}, ${CONSTANTS.ANSI_COLOR_PURPLE}${this.username}, ${CONSTANTS.ANSI_COLOR_LIGHT}goodbye!${CONSTANTS.ANSI_RESET}`);
    }

    showCurrentDirectory(path) {
        console.log(`${EOL}${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_ORANGE}${CONSTANTS.PATH_NOTIFICATION} ${CONSTANTS.ANSI_COLOR_UNDERLINE}${CONSTANTS.ANSI_COLOR_GREEN}${path}${CONSTANTS.ANSI_RESET}`);
    }

    showOpearationFailedMsg() {
        console.error(`${EOL}${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_RED}${CONSTANTS.FAILED_MESSAGE}${CONSTANTS.ANSI_RESET}`);
    }

    showInvalidInputMsg() {
        console.error(`${EOL}${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_RED}${CONSTANTS.INVALID_INPUT_MESSAGE}${CONSTANTS.ANSI_RESET}`);
    }
}