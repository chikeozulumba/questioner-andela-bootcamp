import './config/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { notFound, baseResponse } from './helpers/handlers';
import Meetup from './routes/Meetup';
import Question from './routes/Question';
import Init from './models/Init';

// Instatiate DB
(async () => {
	try {
		await Init();
	} catch (e) {
		console.log(e);
	}
})().catch((err) => {
	console.log(err);
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', Meetup);
app.use('/api/v1', Question);

// Home route
app.get('/', baseResponse);
// Base API route
app.get('/api/v1', baseResponse);
// Handle 404 errors on routes
app.use(notFound);

const PORT = process.env.PORT || 5100;
app.listen(PORT);

export default app;
