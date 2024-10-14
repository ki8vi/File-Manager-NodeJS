import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, basename, resolve } from 'node:path';
import ArgsPathParser from '../argsParser/index.js';

export default class ZipBrotliService {
    static async compress(path, args) {
        try {
            const [targetFile, newFileName] = ArgsPathParser.parseArgs(args);

            const absTargetFilePath = ArgsPathParser.getAbsPath(path, targetFile);
            const absCopyFilePath = ArgsPathParser.getAbsPath(path, newFileName);
            const readStream = createReadStream(absTargetFilePath);
            const writeStream = createWriteStream(join(absCopyFilePath, basename(targetFile).concat('.br')));
    
            await pipeline(readStream, createBrotliCompress(), writeStream);
        } catch(err) {
            throw new Error(err.message);
        }
    }

   
}