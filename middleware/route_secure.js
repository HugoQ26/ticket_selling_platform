module.exports = (req, res, next) => {
  if (req.session.cart) {
    next();
  } else {
    res.redirect("/");
  }
};
