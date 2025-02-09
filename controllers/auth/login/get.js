import { User } from '../../../models/user.js';

export const renderLogin = (_req, res) => {
  res.render('auth/login', {
    page: 'auth/login',
    title: 'login',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    // localStorage.setItem('token', token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    }).redirect('/memes');
  } catch (e) {
      res.status(400).redirect('/login');
      console.log(e);
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('token').redirect('/login');
  } catch (e) {
    res.status(500).send();
  }
};