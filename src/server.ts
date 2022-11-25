import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(routes);


app.listen(3333);