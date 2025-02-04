export default (_req, res) => {
    res.render('index', {
      page: 'memes',
      name: 'memes', 
      title: 'memes',
      includes: {
        js: ['page'],
        css: ['header', 'page']
      }
    });
  };