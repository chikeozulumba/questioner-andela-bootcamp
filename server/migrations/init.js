import User from './user';
import Meetup from './meetup';
import Question from './question';
import dropAllTables from './drop';

// Instatiate DB
(async () => {
	await dropAllTables();
	await User();
	await Meetup();
	await Question();
})().catch((err) => {
	console.log(err);
});
