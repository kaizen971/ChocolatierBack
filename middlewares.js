export function authMiddleware(req, res, next) {
  if (!req.session.user) {
    console.log("Authentification failed")
    return(res.status(500).send("Authentification failed"))
  }
  res.locals.loggedUser = req.session.user;
  next();
}
