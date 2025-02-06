export default (_req, res) => {
  res.render('auth/register', {
    page: 'auth/register',
    name: 'register', 
    title: 'register',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};