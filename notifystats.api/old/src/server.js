const express = require('express');
const app = express();


require('./db/Tables.js');
const Runner = require('./Runner');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


let whitelist = ['http://localhost:8080', 'https://notifystats.me', 'https://notifystats.com', 'https://api.notifystats.me'];
app.use(cors({
	orign: (origin, callback) => {
		console.log(process.env.NODE_ENV);
		// if (process.env.NODE_ENV === 'production') {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allow by CORS'));
			}
		// } else {
		// 	callback(null, true)
		// }
	}
}));



const limiter = rateLimit({
	windowMs: 1000, // 15 minutes
	max: 10// limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);



app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-Witch, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});



const routeVersion = '/v1/';

// app.use('/', require('./db/routes/root'));
app.use(routeVersion + 'channel', require('./api/routes/channel.route'));
app.use(routeVersion + 'admin', require('./api/routes/admin.route'));


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});


module.exports = app;