import { readdir, access, constants } from 'node:fs/promises';

export default class ListService {

    async showContentOfDirectory(path) {
        try {
            await access(path, constants.R_OK)
            const contents = await readdir(path, { withFileTypes: true });
            const dirs = contents.filter(item => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
            const files = contents.filter(item => item.isFile()).sort((a, b) => a.name.localeCompare(b.name));
            const innerList = dirs.map((dir) => ({ name: dir.name, type: 'Directory' }))
            .concat(files.map((file) => ({ name: file.name, type: 'File' })));
            console.table(innerList);
        } catch {
            throw new Error('catch me!')
        }
    }
}