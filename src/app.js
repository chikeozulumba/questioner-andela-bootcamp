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
// Middlewares
const app = express();
app.use(cors());
app.use('/api', Router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', {
	skip: (req, res) => res.statusCode < 400,
}));
app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT);

export default app;
