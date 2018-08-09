module.exports = {
  setCurrentUser: (req, res, next) => {
    res.locals.currentUser = req.session.currentUser;
    next();
  },
  isLoggedIn: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      req.flash('info', 'tienes que logearte');
      res.redirect('/auth/login');
    }
  }
}