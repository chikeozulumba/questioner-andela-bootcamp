import './config/index';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

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
app.use(express.static('UI'));
app.use('/UI', express.static(path.resolve(__dirname, '../../UI/')));

const PORT = process.env.PORT || 3001;

app.listen(PORT);
