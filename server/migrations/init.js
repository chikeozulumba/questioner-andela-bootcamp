import User from './user';
import Meetup from './meetup';
import Question from './question';
import RSVP from './rsvp';
import Comment from './comment';
import Foreign from './foreign';
import Seeders from './seeders';
import dropAllTables from './drop';

// Instatiate DB
(async () => {
	await dropAllTables();
	await User();
	await Meetup();
	await Question();
	await RSVP();
	await Comment();
	await Foreign();
	await Seeders();
	console.log('###############################################################');
	console.log('                   DONE, MIGRATION COMPLETE!                   ');
	console.log('###############################################################');
})().catch((err) => {
	console.log(err);
});
