import { resolve, isAbsolute } from 'node:path';

export default class ArgsPathParser {

    static parseArgs(args) {
        const cliArgsStr = args.join(' ');
        const parsedArgs = cliArgsStr.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g);
     
        if (!parsedArgs || !parsedArgs.length) {
            throw new Error('Invalid arguments');
        }
        return parsedArgs.map(arg => arg.replace(/['"]/g, ''));
    }

    static getAbsPath(currPath, targetPath) {
        return isAbsolute(targetPath) ? targetPath : resolve(currPath, targetPath);
    }
}