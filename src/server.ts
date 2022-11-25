import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 3333;
const HOST = '0.0.0.0';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(routes);

app.listen(PORT, HOST, () => {
  logger.info(`Server started on port ${PORT}`);
});
