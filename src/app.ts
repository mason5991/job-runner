import express from 'express';
import cors from 'cors';
import routes from './routes';
import logRequest from './middlewares/logRequest';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use(logRequest);

app.use(routes);

app.use(errorHandler);

export default app;
