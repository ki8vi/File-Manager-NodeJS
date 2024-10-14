import inputController from './src/inputController/index.js';
import UsernameParser from './src/usernameParserService/index.js';


const username = new UsernameParser().getUsername();
const myApp = new inputController(username);
myApp.start();


