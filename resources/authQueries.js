const { query } = require("../config/db");

exports.createUser = async (userData) => {
  try {
    const sql =
      "INSERT INTO `user`(`first_name`, `last_name`, `email`, `password`) VALUES (?,?,?,?)";
    const res = await query(sql, userData);
    return res;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user. Please try again later.");
  }
};

exports.getByEmail = async (email) => {
  try {
    const sql =
      "SELECT user_id, first_name, last_name, email FROM `user` WHERE email = ?";
    const res = await query(sql, email);
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.user_id,
        firstName: value.first_name,
        lastName: value.last_name,
        email: value.email,
        password: value.password,
      });
    });
    return dataArr[0] || null;
  } catch (err) {
    console.error("Error retrieving user data:", err);
    throw new Error("Failed to retrieve user data. Please try again later.");
  }
};
exports.getById = async (id) => {
  try {
    const sql =
      "SELECT user_id, first_name, last_name, email FROM `user` WHERE user_id = ?";
    const res = await query(sql, id);
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.user_id,
        firstName: value.first_name,
        lastName: value.last_name,
        email: value.email,
      });
    });
    return dataArr[0] || null;
  } catch (err) {
    console.error("Error retrieving user data:", err);
    throw new Error("Failed to retrieve user data. Please try again later.");
  }
};
