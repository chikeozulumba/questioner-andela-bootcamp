import './config/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import { notFound, baseResponse } from './helpers/handlers';
import Meetup from './routes/Meetup';
import Question from './routes/Question';
import Comment from './routes/Comment';
import User from './routes/User';

const swaggerDoc = require('../documentation.json');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Documentation
app.use('/docs', swagger.serve, swagger.setup(swaggerDoc));

app.use('/api/v1', User);
app.use('/api/v1', Meetup);
app.use('/api/v1', Question);
app.use('/api/v1', Comment);

// Home route
app.get('/', baseResponse);
// Base API route
app.get('/api/v1', baseResponse);
// Handle 404 errors on routes
app.use(notFound);

const PORT = process.env.PORT || 5100;
app.listen(PORT);

export default app;
