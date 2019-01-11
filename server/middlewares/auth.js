/* eslint-disable consistent-return */
import JWT from 'jsonwebtoken';
import db from '../config/database';
import { errorRxx } from '../helpers/handlers';
import { getUserByID } from '../models/index';
/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
const verifyCSRF = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return errorRxx(res, 403, 'Invalid Authorization');
	try {
		const decoded = await JWT.verify(token, process.env.JWT_SIGN_SECRET_KEY);
		const { rows } = await db.query(getUserByID, [decoded.userId]);
		if (!rows[0]) return errorRxx(res, 403, 'The Authorization token you provided is invalid');
		req.user = rows[0];
		next();
	} catch (error) {
		return errorRxx(res, 500, 'Internal server error');
	}
};

export default { verifyCSRF };
