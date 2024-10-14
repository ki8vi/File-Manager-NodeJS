import { resolve, isAbsolute, sep, normalize } from 'node:path';

export default class ArgsPathParser {

    static getAbsPath(currPath, targetPath) {
        return isAbsolute(targetPath) ? targetPath : resolve(currPath, targetPath);
    }

    static parseArgs(args, isOneArg = true) {
        const cliArgsStr = args.join(' ');
        const possibleSeparators = ['/', '\\'];

        const parsedArgs = cliArgsStr.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g);
  
        if (!parsedArgs) {
            throw new Error('Invalid arguments');
        }

    
        const finalArgs = parsedArgs.map((arg) => {
            possibleSeparators.forEach(separator => {
                arg = arg.split(separator).join(sep);
            });
    

    
            const pathParts = arg.split(sep);
            const clearParts = pathParts.map((part) => {
                if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
                    return part.slice(1, -1);
                }
                return part;
            })
         
            return clearParts.join(sep);
        });
    
        if (isOneArg) {
            if (finalArgs.length !== 1) {
                throw new Error('Invalid arguments');
            }

            return finalArgs[0];
        } else {
            if (finalArgs.length > 2) {
                throw new Error('Invalid arguments');
            }

            return [finalArgs[0], finalArgs[1]];
        }
    }
}