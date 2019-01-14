import User from './user';
import Meetup from './meetup';
import Question from './question';
import RSVP from './rsvp';
import dropAllTables from './drop';

// Instatiate DB
(async () => {
	await dropAllTables();
	await User();
	await Meetup();
	await Question();
	await RSVP();
	console.log('###############################################################');
	console.log('                   DONE, MIGRATION COMPLETE!                   ');
	console.log('###############################################################');
})().catch((err) => {
	console.log(err);
});
