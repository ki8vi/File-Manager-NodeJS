import { createInterface } from 'node:readline/promises';
import { homedir } from 'node:os';
import CONSTANTS from '../constants/index.js';
import { resolve, dirname, parse } from 'node:path';
import MessageService from '../messageService/index.js';

export default class InputService {
    constructor(username) {
        this.username = username;
        this.currDirectory = homedir();
        this.readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
       });
       this.messageService = new MessageService(this.username);
    }

    start() {
        this.messageService.showGreet();
        this.#handleEvents();
    }

    #showDirectory() {
        this.messageService.showCurrentDirectory(this.currDirectory);
        this.readline.prompt();
    }

    #handleEvents() {
        this.#showDirectory();
        this.readline.on('line', (input) => {
            const parsedInput = input.trim().toLowerCase();
            switch(parsedInput) {
                case '.exit':
                    this.#exit();
                    break;
                case 'up':
                    this.#up();
                    break;
            }
            this.#showDirectory();
        });
        this.readline.on('SIGINT', () => this.#exit());
    }

    #exit() {
        this.messageService.showBye();
        this.readline.close();
        process.exit();
    }

    #up() {
        const newDirectory = resolve(this.currDirectory, '..');
        if (newDirectory !== this.currDirectory) {
            this.currDirectory = newDirectory;
            process.chdir(this.currDirectory);
        }
    }
}
