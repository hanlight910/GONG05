import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './routers/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
	console.error(err)
	const statusCode = err.status || 500;
	res.status(statusCode).send(err.message)
})

app.listen(PORT, () => {
	console.log(`서버가 열렸습니다. ${PORT}`);
});
