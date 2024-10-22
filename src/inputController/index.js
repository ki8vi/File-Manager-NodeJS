import { createInterface } from 'node:readline/promises';
import MessageService from '../messageService/index.js';
import NavigationService from '../navigationService/index.js';
import ListService from '../listService/index.js';
import FileOperationsService from '../fileOperationsService/index.js';
import SystemInfoService from '../systemInfoService/index.js';
import HashService from '../hashService/index.js';
import ZipBrotliService from '../zipBrotliService/index.js';
import CONSTANTS from '../constants/index.js';
import CMD_CONSTANTS from './constants.js';

export default class inputController {
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
            try {
                const path = this.navigationService.getCurrentDirectory;
                switch(userInput) {
                    case CMD_CONSTANTS.EXIT:
                        this.#exit();
                        break;
                    case CMD_CONSTANTS.UP:
                        this.navigationService.up();
                        break;
                    case CMD_CONSTANTS.CD:
                        await this.navigationService.cd(cliArgs);
                        break;
                    case CMD_CONSTANTS.LS:
                        await this.listService.showContentOfDirectory(path);
                        break;
                    case CMD_CONSTANTS.CAT:
                        await this.fileOperationsService.cat(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.ADD:
                        await this.fileOperationsService.createFile(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.RN:
                        await this.fileOperationsService.renameFile(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.CP:
                        await this.fileOperationsService.copyFile(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.MV:
                        await this.fileOperationsService.moveFile(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.RM:
                        await this.fileOperationsService.deleteFile(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.OS:
                        await SystemInfoService.printOsInfo(cliArgs);
                        break;
                    case CMD_CONSTANTS.HASH:
                        await HashService.calculate(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.COMPRESS:
                        await ZipBrotliService.zipUnzip(path, cliArgs);
                        break;
                    case CMD_CONSTANTS.DECOMPRESS:
                        await ZipBrotliService.zipUnzip(path, cliArgs, false);
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



