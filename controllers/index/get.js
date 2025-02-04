export default (_req, res) => {
  res.render('index', {
    page: 'index/index',
    name: 'tayfa', 
    title: 'kamp tayfa',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};