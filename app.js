import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

import indexRouter from './routers/index.js';
import authRouter from './routers/auth.js';
import memesRouter from './routers/memes.js';

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kamp-tayfa');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
}));

app.use('/memes', memesRouter)
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
