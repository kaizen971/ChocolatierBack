export function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return(res.status(400).send("Authentification failed"))
  }
  res.locals.loggedUser = req.session.user;
  next();
}
