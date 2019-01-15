import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
export const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);

/**
 * Gnerate Token
 * @param {string} id
 * @returns {string} token
 */
export const generateToken = (id) => {
	const token = jwt.sign({
		userId: id,
	},
	process.env.JWT_SIGN_SECRET_KEY, { expiresIn: '7d' });
	return token;
};
