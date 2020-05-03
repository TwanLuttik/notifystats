require('dotenv').config();
const app = require('./src/server');
const http = require('http').Server(app);
const port = 3005;

http.listen(port, () => {
	console.log(`api running on port ${port}`);
});