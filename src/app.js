import './config/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { notFound } from './functions/handlers';
import Router from './routes/router';

const app = express();
app.use(cors());
app.use('/api', Router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', {
	skip: (req, res) => res.statusCode < 400,
}));
// Route to display info about the api
app.get('/', (req, res) => res.status(200).send('<h1>Questioner Project</h1><br><a href="https://github.com/chikeozulumba/questioner-andela-bootcamp">Visit the Github page.</a>'));

// Handle 404 errors on routes
app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT);

export default app;
