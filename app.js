const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const notFound = require("./middleware/not-found");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auths", authRoutes);
app.use("*", checkUser);
app.get("/", requireAuth, (req, res) => {
  res.render("index");
});
app.get("/blank", requireAuth, (req, res) => {
  res.render("blank");
});

app.get("/tables", requireAuth, (req, res) => {
  res.render("tables");
});
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/categories", categoryRoutes);
// 404 handler
app.use(notFound);

// Start server
app.listen(5000, (err) => {
  err ? console.log(err) : console.log("Server is running on port 5000");
});
