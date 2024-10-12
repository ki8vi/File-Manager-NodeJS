import { createInterface } from 'node:readline/promises';
import MessageService from '../messageService/index.js';
import NavigationService from '../navigationService/index.js';
import ListService from '../listService/index.js';

export default class InputService {
    constructor(username) {
        this.username = username;
        this.readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
       });
       this.messageService = new MessageService(this.username);
       this.navigationService = new NavigationService();
       this.listService = new ListService();
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
            try {
                switch(userInput) {
                    case '.exit':
                        this.#exit();
                        break;
                    case 'up':
                        this.navigationService.up();
                        break;
                    case 'cd':
                        await this.navigationService.cd(cliArgs.join(' '));
                        break;
                    case 'ls':
                        await this.listService.showContentOfDirectory(this.navigationService.getCurrentDirectory);
                        break;
                    default:
                        this.messageService.showInvalidInputMsg();
                        break;
                }
            } catch {
                this.messageService.showOpearationFailedMsg();
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
