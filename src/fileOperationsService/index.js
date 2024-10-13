import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile,rename } from 'node:fs/promises';
import { EOL } from 'node:os';
import { join, resolve, isAbsolute, dirname, basename } from 'node:path';
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
            readStream.on('error', () => {
                reject(new Error('Invalid arguments'));
            });

            readStream.on('end', () => {
                process.stdout.write(`${CONSTANTS.ANSI_RESET}${EOL}`);
                resolve();
            });
        });
    }

    async createFile(path) {
        await writeFile(path, '', 'utf8');
    }

    async renameFile(path, args) {
        const [targetFile, newFileName] = this.parseArgs(args);

        const absTargetFilePath = this.getAbsPath(path, targetFile);
        const newRenamedFile = join(dirname(absTargetFilePath), newFileName);

        await rename(absTargetFilePath, newRenamedFile);
    }

    parseArgs(args) {
        const cliArgsStr = args.join(' ');
        const parsedArgs = cliArgsStr.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g);
     
        if (!parsedArgs || parsedArgs.length < 2) {
            throw new Error('Invalid arguments');
        }
        return parsedArgs.map(arg => arg.replace(/['"]/g, ''));
    }

    async copyFile(path, args) {
        const [targetFile, copyFilePath] = this.parseArgs(args);

        const absTargetFilePath = this.getAbsPath(path, targetFile);
        const absCopyFilePath = this.getAbsPath(path, copyFilePath);

        return new Promise((resolve, reject) => {
            const readStream = createReadStream(absTargetFilePath);
            const writeStream = createWriteStream(join(absCopyFilePath, basename(targetFile)));
            readStream.pipe(writeStream);

            readStream.on('error', (err) => {
                reject(new Error(err.message));
            });
            writeStream.on('error', (err) => {
                reject(new Error(err.message));
            });

            writeStream.on('finish', resolve);
        });
    }

    getAbsPath(currPath, targetPath) {
        return isAbsolute(targetPath) ? targetPath : resolve(currPath, targetPath);
    }
}