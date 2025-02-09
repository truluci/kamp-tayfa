export default (_req, res) => {
  res.render('auth/login', {
    page: 'auth/login',
    title: 'login',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};
