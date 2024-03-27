const LOCAL = 'local';
const REMOTE = 'remote';
const server = "https://api.thisissumin.store/";
const local = "http://localhost:5001/";



const setting = LOCAL;
const config = {
    url: setting == LOCAL? local : server
}



export default config;