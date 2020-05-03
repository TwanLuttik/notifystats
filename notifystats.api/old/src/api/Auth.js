const postgres = require('../db/postgres');
const pg = new postgres();

module.exports = async (req, res, next) => {
	let key = req.headers.authorization;
	// let keyValid = await sql.isAuthKeyValid()

	if (await pg.isAuthKeyValid(key)) {
		next();
	} else {
		return res.status(401).json({
			success: false,
			message: 'Auth key is not valid'
		})
	}
};
