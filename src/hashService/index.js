import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import ArgsPathParser from '../argsParser/index.js';

export default class HashService {

    static async calculate(currPath, args) {
        const parseArgs = ArgsPathParser.parseArgs(args);
        const targetFilePath = ArgsPathParser.getAbsPath(currPath, parseArgs);
        const readFileStream = createReadStream(targetFilePath);
        const hasher = createHash('sha256');
        await pipeline(readFileStream, hasher);
        const hash = hasher.digest('hex');
        console.log(hash);
    }
}