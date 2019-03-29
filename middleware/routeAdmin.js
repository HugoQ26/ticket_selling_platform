module.exports = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.json({ error: "You have to have admin privilages" });
  }
};
