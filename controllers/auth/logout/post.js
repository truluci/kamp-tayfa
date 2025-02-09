export default (req, res) => {
  req.user.tokens = req.user.tokens
    .filter(token => token.token !== req.token);

  req.user.save()
    .then(() => {
      return res.clearCookie('token').redirect('/auth/login');
    })
    .catch(() => {
      return res.status(500).send();
    });
};
