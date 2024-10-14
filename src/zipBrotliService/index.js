import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, basename } from 'node:path';
import ArgsPathParser from '../argsParser/index.js';

export default class ZipBrotliService {
    static async zipUnzip(path, args, isCompress = true) {
        try {
            const [targetFile, newFileName] = ArgsPathParser.parseArgs(args, false);
            console.log(targetFile, newFileName)
            const absTargetFilePath = ArgsPathParser.getAbsPath(path, targetFile);
            const absCopyFilePath = ArgsPathParser.getAbsPath(path, newFileName);
            const outputFileName = isCompress ? basename(targetFile).concat('.br') : basename(targetFile).replace('.br', '');

            const readStream = createReadStream(absTargetFilePath);
            const writeStream = createWriteStream(join(absCopyFilePath, outputFileName));
            const brotli = isCompress ? createBrotliCompress() : createBrotliDecompress();
            await pipeline(readStream, brotli, writeStream);
        } catch(err) {
            throw new Error(err.message);
        }
    }

   
}