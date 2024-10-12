import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';
import CONSTANTS from '../constants/index.js';

export default class FileOperationsService {

    async cat(path) {
        const readStream = createReadStream(path, { encoding: 'utf8' });

        readStream.on('data', (ch) => {
            process.stdout.write(`${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_LIGHT}${ch}`);
        });

        readStream.on('end', () => {
            process.stdout.write(`${EOL}`);
        });

        return new Promise((resolve, reject) => {
            readStream.on('error', (err) => {
                reject(new Error(err.message));
            });

            readStream.on('end', () => {
                process.stdout.write(`${CONSTANTS.ANSI_RESET}${EOL}`);
                resolve();
            });
        });
    }
}