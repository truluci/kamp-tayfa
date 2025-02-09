export default (_req, res) => {
  res.render('index', {
    page: 'index/index',
    title: 'kamp tayfa',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};
