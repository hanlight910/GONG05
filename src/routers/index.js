import userRouter from '../routers/userRouter.js';
import productRouter from '../routers/productRouter.js';
import express from 'express';

const index = express();

index.use('/users', userRouter);
index.use('/products', productRouter);

export default index;
