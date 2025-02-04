import express from 'express';
import mongoose from 'mongoose';
import indexRouter from './routers/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kamp-tayfa';

mongoose.connect(MONGODB_URI);

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});