export default class UsernameParser {
    constructor() {
        this.username = null;
    }

    #parseArgv() {
        const args = process.argv.slice(2);
        if (args.length) {
            const parsedUsername = args[0].split('=')[1];
            if (parsedUsername) {
                this.username = parsedUsername;
            }
        }
    }

    #parseEnv() {
        if (!this.username) {
            const envUsername = process.env.npm_config_username;
            if (envUsername !== 'true') {
                this.username = envUsername;
            }
        }
    }

    
    #uppercasedUsername() {
        if (this.username) {
            this.username = this.username.slice(0, 1).toUpperCase().concat(this.username.slice(1));
        }
    }

    getUsername() {
        this.#parseArgv();
        this.#parseEnv();
        this.#uppercasedUsername();
        return this.username || 'Nameless buddy';
    }
}

