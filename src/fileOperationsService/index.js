import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, rename, unlink, access, constants } from 'node:fs/promises';
import { EOL } from 'node:os';
import { join, dirname, basename } from 'node:path';
import CONSTANTS from '../constants/index.js';
import ArgsPathParser from '../argsParser/index.js';

export default class FileOperationsService {

    async cat(path) {
        const readStream = createReadStream(path, { encoding: 'utf8' });

        readStream.on('data', (ch) => {
            process.stdout.write(`${CONSTANTS.ANSI_COLOR_BOLD}${CONSTANTS.ANSI_COLOR_LIGHT}${ch}`);
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
        const [targetFile, newFileName] = ArgsPathParser.parseArgs(args);

        const absTargetFilePath = ArgsPathParser.getAbsPath(path, targetFile);
        const newRenamedFile = join(dirname(absTargetFilePath), newFileName);

        await rename(absTargetFilePath, newRenamedFile);
    }

    async copyFile(path, args) {
        const [targetFile, copyFilePath] = ArgsPathParser.parseArgs(args);

        const absTargetFilePath = ArgsPathParser.getAbsPath(path, targetFile);
        const absCopyFilePath = ArgsPathParser.getAbsPath(path, copyFilePath);
        await access(absTargetFilePath, constants.F_OK);
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

    async moveFile(path, args) {
        await this.copyFile(path, args);
        await this.deleteFile(path, args);
    }

    async deleteFile(path, args) {
        const [targetFile] = args;
        const absTargetFilePath = ArgsPathParser.getAbsPath(path, targetFile);
        await access(absTargetFilePath, constants.F_OK);
        await unlink(absTargetFilePath);
    }
}