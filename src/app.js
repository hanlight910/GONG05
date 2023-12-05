dotenv.config()
import express from 'express';
import dotenv from 'dotenv'
// import userRouter from './src/routers/userRouter.mjs';
// import productRouter from './src/routers/productRouter.mjs';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());

// app.use('/users', userRouter);
// app.use('/products', productRouter);

app.listen(PORT, () => {
	console.log(`서버가 열렸습니다. ${PORT}`);
});

