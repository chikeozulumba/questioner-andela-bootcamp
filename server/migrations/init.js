import User from './user';
import dropAllTables from './drop';

// Instatiate DB
(async () => {
	await dropAllTables();
	await User();
	console.info('Created all tables');
})().catch((err) => {
	console.log(err);
});
