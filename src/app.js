dotenv.config()
import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';


import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(PORT, () => {
	console.log(`서버가 열렸습니다. ${PORT}`);
});

