import { EOL } from 'node:os';
import cmdMap from './infoMap.js';

export default class SystemInfoService {
    static async printOsInfo(cmd) {
        const method = cmdMap[cmd[0]];
        if (method) {
            this[method]();
        } else {
            throw new Error('Invalid arguments');
        }
    }

    static showEOL() {
        console.log(`${JSON.stringify(EOL)}`);
    }


}