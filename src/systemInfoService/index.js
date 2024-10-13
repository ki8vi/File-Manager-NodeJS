import { EOL, cpus } from 'node:os';
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

    static showCpus() {
        const cpusInfo = cpus().reduce((acc, el) => {
            const model = el.model;
            const speed = `${el.speed / 1000} GHz`;
            acc.push({ model, 'speed (clock rate)': speed });
            return acc;
        }, []);
        console.table(cpusInfo);
    }
}