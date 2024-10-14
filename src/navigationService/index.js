import { access, stat } from 'node:fs/promises';
import { resolve, isAbsolute, join  } from 'node:path';
import { homedir} from 'node:os';
import ArgsPathParser from '../argsParser/index.js';

export default class NavigationService {
    constructor() {
        this._currentDir = homedir();
    }

    up() {
        const newDirectory = resolve(this._currentDir, '..');
        if (newDirectory !== this._currentDir) {
            this._currentDir = newDirectory;
            process.chdir(this._currentDir);
        }
    }

    async cd(path) {

        const parsedPath = ArgsPathParser.parseArgs(path);
        let newDirectory;
        if (isAbsolute(parsedPath)) {
            newDirectory = parsedPath;
        } else {
            newDirectory = resolve(this._currentDir, parsedPath);
        }
 
        await access(newDirectory);
        const stats = await stat(newDirectory);
        if (stats.isDirectory()) {
            this._currentDir = newDirectory;
            process.chdir(this._currentDir);
        } else {
            throw new Error('I just will be intercept at the up level where I will be catched');
        }
    }

    get getCurrentDirectory() {
        return this._currentDir;
    }
}