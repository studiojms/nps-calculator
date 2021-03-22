import 'reflect-metadata';
import express from 'express';

import createConnection from './db';
import router from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export default app;
