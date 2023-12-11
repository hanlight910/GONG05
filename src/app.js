import express from 'express';
import dotenv from 'dotenv';
import router from './routers/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
	console.error(err)
	const statusCode = err.status || 500;
	const message = err.message || '서버 에러입니다 관리자에게 문의해주세요'
	res.status(statusCode).send(message)
})

app.listen(PORT, () => {
	console.log(`서버가 열렸습니다. ${PORT}`);
});
