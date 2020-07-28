const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./app/config/db");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;
const flash = require("express-flash"); //for help to manage session in cookie
const MongoDbStore = require("connect-mongo")(session); //use for store session in db
const mongoose = require("mongoose");
//Load env vars
dotenv.config({ path: "./app/config/config.env" });

//Connect database
connectDB();
//below code use for session
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected....");
  })
  .catch((err) => console.log("Connection failed.."));

//Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }) //24 Hours
);
app.use(flash());

//Asset
app.use(express.static("public"));
app.use(express.json());

//Global middleware use for set default sessionso cart is 0 when start the app
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//Routes
require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`App is start on port ${PORT}`);
});
