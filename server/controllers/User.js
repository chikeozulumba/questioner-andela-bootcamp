import {
	errorRxx,
	response2xx,
} from '../helpers/handlers';
import {
	comparePassword,
	generateToken,
} from '../helpers/auth';
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
		if (await UserQuery.getUserByEmail() && await UserQuery.rowCount > 0) return errorRxx(res, 409, 'Email already in use');
		if (!await UserQuery.createNewUser()) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		const user = UserQuery.result;
		const token = generateToken(user.id);
		const response = { token, user };
		return response2xx(res, 201, response);
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
		if (!comparePassword(user.password, req.body.password)) return errorRxx(res, 401, 'Invalid email or password combination');
		const token = generateToken(user.id);
		const response = { token, user };
		return response2xx(res, 200, response);
	}
}

export default User;
