export default (_req, res) => {
  return res.render('auth/register', {
    page: 'auth/register',
    title: 'register',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};
