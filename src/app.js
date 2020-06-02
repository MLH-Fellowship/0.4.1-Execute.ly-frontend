import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Use bodyParser to put raw req properties at req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use('/', routes);

export default app;