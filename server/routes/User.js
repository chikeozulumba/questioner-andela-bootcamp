import express from 'express';
import { UserValidation } from '../middlewares/validator';
import Auth from '../middlewares/auth';
import User from '../controllers/User';

const router = express.Router();

/**
 * @name CreateUser
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a new User
 */
router.post('/auth/signup', [UserValidation], User.create);

/**
 * @name LoginUser
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Sign in existing User
 */
router.post('/auth/signin', [UserValidation], User.signIn);

export default router;
