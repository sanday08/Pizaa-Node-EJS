function authControllers() {
  return {
    login: (req, res) => {
      res.render("login");
    },
    //you can also write this
    register(req, res) {
      res.render("register");
    },
  };
}
module.exports = authControllers;
