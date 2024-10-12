export default class Events {
    constructor(messageService) {
        this.ms = new messageService;
    }
    async handleEvent(rl) {
        rl.on('line', (input) => {
            const parsedInput = input.trim().toLowerCase();
            switch(parsedInput) {
                case 'up': 
                    console.log('up trigerred');
                    break;
                case '.exit':
                    this.ms.s
            }
        });
    }
}