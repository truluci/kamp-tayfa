export default (_req, res) => {
  return res.render('auth/login', {
    page: 'auth/login',
    title: 'login',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};
