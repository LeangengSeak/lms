const userQuery = require("../resources/authQueries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateRegister,
  validateLogin,
} = require("../validation/authValidtion");

const generateToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: 3 * 24 * 60 * 60 });
};

const getForgotPassword = (req, res) => {
  res.render("auth/forgot-password");
};

const getLogin = (req, res) => {
  res.render("auth/login");
};

const postLogin = async (req, res) => {
  const { error, value } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { email, password } = value;
  const result = await userQuery.getByEmail(email);
  console.log(result);
  try {
    if (result.email === email) {
      console.log("email found");
      const comparepassword = await bcrypt.compare(password, result.password);
      if (comparepassword) {
        const token = generateToken(result.id);
        console.log(token);
        res.cookie("jwt", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        console.log("password match");
        res.redirect("/");
      } else {
        res.send("invalid password");
      }
    } else {
      res.sent("email not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getRegister = (req, res) => {
  res.render("auth/register");
};

const postRegister = async (req, res) => {
  console.log(req.body);
  const { error, value } = validateRegister(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { firstName, lastName, email, password } = value;
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);
  const arrUser = [firstName, lastName, email, hashedPassword];
  try {
    await userQuery.createUser(arrUser);
    console.log("user created");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  getForgotPassword,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
};
