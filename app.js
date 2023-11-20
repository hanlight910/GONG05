require('dotenv').config();

const express = require('express');
const db = require('./config/database');
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/', productRouter);

const port = process.env.Port;
app.listen(port, () => {
	console.log(`서버가 열렸습니다. ${port}`);
});

async function testDBConnection() {
	try {
		await db.authenticate();
		console.log('Sequelize로 DB 연결에 성공했습니다.');
	} catch (error) {
		console.error('DB 연결에 실패했습니다.', error);
	}
}

testDBConnection();
