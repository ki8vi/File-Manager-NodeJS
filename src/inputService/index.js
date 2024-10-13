import { createInterface } from 'node:readline/promises';
import { join } from 'node:path';
import MessageService from '../messageService/index.js';
import NavigationService from '../navigationService/index.js';
import ListService from '../listService/index.js';
import FileOperationsService from '../fileOperationsService/index.js';
import CONSTANTS from '../constants/index.js';
export default class InputService {
    constructor(username) {
        this.username = username;
        this.readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_BLUE} > ${CONSTANTS.ANSI_RESET}`,
       });
       this.messageService = new MessageService(this.username);
       this.navigationService = new NavigationService();
       this.listService = new ListService();
       this.fileOperationsService = new FileOperationsService();
    }

    start() {
        this.messageService.showGreet();
        this.#handleEvents();
    }

    #showDirectory() {
        this.messageService.showCurrentDirectory(this.navigationService.getCurrentDirectory);
        this.readline.prompt();
    }

    #handleEvents = async () => {
        this.#showDirectory();
        this.readline.on('line', async (input) => {
            const parsedInput = input.trim();
            const [userInput, ...cliArgs] = parsedInput.split(' ');
            const cliArgsStr = cliArgs.join(' ');
            try {
                switch(userInput) {
                    case '.exit':
                        this.#exit();
                        break;
                    case 'up':
                        this.navigationService.up();
                        break;
                    case 'cd':
                        await this.navigationService.cd(cliArgsStr);
                        break;
                    case 'ls':
                        await this.listService.showContentOfDirectory(this.navigationService.getCurrentDirectory);
                        break;
                    case 'cat':
                        await this.fileOperationsService.cat(join(this.navigationService.getCurrentDirectory, cliArgsStr));
                        break;
                    case 'add':
                        await this.fileOperationsService.createFile(join(this.navigationService.getCurrentDirectory, cliArgsStr));
                        break;
                    case 'rn':
                        await this.fileOperationsService.renameFile(this.navigationService.getCurrentDirectory, cliArgs);
                        break;
                    default:
                        this.messageService.showInvalidInputMsg();
                        break;
                }
            } catch(err) {
                if(err.message === 'Invalid arguments' || err.code === 'EISDIR') this.messageService.showInvalidInputMsg();
                else this.messageService.showOpearationFailedMsg();
            }
            this.#showDirectory();
        });
        this.readline.on('SIGINT', this.#exit.bind(this));
    }

    #exit() {
        this.messageService.showBye();
        this.readline.close();
        process.exit();
    }
}
