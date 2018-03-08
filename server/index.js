const express = require("express");
const app = express();
const db = require("./db");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080
// if (process.env.NODE_ENV !== 'production') require('../secrets')

//LOGGING MIDDLEWARE
app.use(morgan('default'));

//BODY PARSING MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // compression middleware
// app.use(compression())

//EXPRESS SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "chimac is so yum",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.use((req, res, next) => {
  console.log("SESSION: ", req.session);
  next();
});

//STATIC FILE_SERVING MIDDLEWARE
app.use(express.static(path.join(__dirname, "...", "public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

//PASSPORT
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done)
);

db.sync({ force: false })
  .then(() => {
    console.log('Postgres running and your data is SYNCED')
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Your sever is listening on ${PORT}`)
    })
  })
  .catch(console.error)

