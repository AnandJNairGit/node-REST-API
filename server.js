const http = require('http');
const app = require('./REST/app');
const port = 3000;

const server = http.createServer(app);
server.listen(port);
console.log("helo");