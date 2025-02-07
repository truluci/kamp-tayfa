import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routers/index.js';
import registerRouter from './routers/register.js';
import loginRouter from './routers/login.js';
import './db/mongoose.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});