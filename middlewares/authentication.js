function ensureAuthenticated(req, res, next) {
  //console.log("Checking authentication...");
  if (req.isAuthenticated()) {
    return next();
  }
  // eslint-disable-next-line prettier/prettier
  res.status(401).json("You do no have access");
}

module.exports = ensureAuthenticated;
