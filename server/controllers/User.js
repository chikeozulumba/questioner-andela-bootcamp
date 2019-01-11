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
}

export default User;
