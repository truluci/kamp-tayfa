export default (req, res) => {
  return res.render('index', {
    page: 'index/index',
    title: 'kamp tayfa',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    },
    user: req.user,
    // token: req.token
  });
};
