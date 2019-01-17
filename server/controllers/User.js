import { errorRxx, response2xx } from '../helpers/handlers';
import { comparePassword, generateToken } from '../helpers/auth';
import UserModel from '../models/User';
/**
 * Create Meetup Class
 */
class User {
	/**
 * @name Create
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a User Record
 */
	static async create(req, res) {
		const UserQuery = new UserModel(req.body);
		if (await UserQuery.getUserByEmail() && await UserQuery.rowCount > 0) return errorRxx(res, 500, UserQuery.error || 'Email already in use');
		if (!await UserQuery.createNewUser()) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		return response2xx(res, 201, UserQuery.result);
	}

	/**
 * @name SignIn
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description User can sign in
 */
	static async signIn(req, res) {
		const UserQuery = new UserModel(req.body);
		if (await UserQuery.getUserByEmail() && await UserQuery.rowCount === 0) return errorRxx(res, 404, 'User record not found');
		const user = await UserQuery.result[0];
		// console.log(user)
		if (!comparePassword(user.password, req.body.password)) return errorRxx(res, 403, 'Passwords don\'t match');
		user.token = generateToken(user.id);
		return response2xx(res, 200, user);
	}
}

export default User;
