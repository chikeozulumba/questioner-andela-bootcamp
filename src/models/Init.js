import User from './User';

const Init = async () => {
	try {
		await User();
		console.info('Creating User table');
	} catch (e) {
		throw e;
	}
};

export default Init;
