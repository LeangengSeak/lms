const jwt = require("jsonwebtoken");
const userQuery = require("../resources/authQueries");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        res.redirect("/auths/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/auths/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, "secret", async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.redirect("/auths/login");
        } else {
          const data = await userQuery.getById(decodedToken.id);
          res.locals.user = data;
        }
        next();
      });
    } else {
      res.locals.user = null;
      res.redirect("/auths/login");
      next();
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { requireAuth, checkUser };
