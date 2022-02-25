import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import expressLogger from './utils/logger';
import { default as authRouter } from './routes/auth';
import { default as profileRouter } from './routes/profile';

import mongooseConnection from './utils/mongoose';
console.log('Mongoose state:', mongooseConnection.connection.readyState);

const app = express();

app.use(express.json());
app.use(expressLogger);
app.use(authRouter);
app.use(profileRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	return res.status(500).json({
		message: 'failed',
		errors: [err.message]
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servers started on http://localhost:${port}`));
