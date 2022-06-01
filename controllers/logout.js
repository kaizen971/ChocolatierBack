export default function logout(req, res) {
  console.log(req.session.user)
  req.session.destroy(() => {
    res.status(200).send("session destroy")
  });
}
