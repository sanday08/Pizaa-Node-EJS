const homeControllers = require("../app/http/controllers/homeControllers");
const authControllers = require("../app/http/controllers/authControllers");
const cartControllers = require("../app/http/controllers/customer/cartControllers");
function webRoutes(app) {
  app.get("/", homeControllers().index);
  app.get("/login", authControllers().login);
  app.get("/register", authControllers().register);
  app.get("/cart", cartControllers().index);

  app.post("/update-cart", cartControllers().update);
}

module.exports = webRoutes;
