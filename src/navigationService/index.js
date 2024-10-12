import { access, stat } from 'node:fs/promises';
import { resolve, isAbsolute  } from 'node:path';
import { homedir } from 'node:os';

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
        let newDirectory;
        if (isAbsolute(path)) {
            newDirectory = path;
        } else {
            newDirectory = resolve(this._currentDir, path);
        }
        // const newDirectory = resolve(this._currentDir, path);
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

    set setCurrentDirectory(newDirectory) {
        this._currentDir = newDirectory;
    }
}