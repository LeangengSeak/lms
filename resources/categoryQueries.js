const { query } = require("../config/db");

exports.getAllCategories = async () => {
  try {
    const res = await query("SELECT * FROM category");
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.category_id,
        categoryName: value.name,
      });
    });
    return dataArr || null;
  } catch (err) {
    console.error("Error retrieving category data:", err);
    throw new Error(
      "Failed to retrieve category data. Please try again later."
    );
  }
};

exports.getById = async (id) => {
  try {
    const res = await query("SELECT * FROM category WHERE category_id = ?", id);
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.category_id,
        categoryName: value.name,
      });
    });
    return dataArr[0] || null;
  } catch (err) {
    console.error("Error retrieving category data:", err);
    throw new Error(
      "Failed to retrieve category data. Please try again later."
    );
  }
};

exports.createCategory = async (categoryData) => {
  try {
    const res = await query(
      "INSERT INTO `category`(`name`) VALUES (?)",
      categoryData
    );
    return res;
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error("Failed to create category. Please try again later.");
  }
};

exports.updateCategory = async (categoryData) => {
  try {
    const res = await query(
      "UPDATE `category` SET `name`= ? WHERE `category_id` = ?",
      categoryData
    );
    return res;
  } catch (err) {
    console.error("Error updating category:", err);
    throw new Error("Failed to update category data. Please try again later.");
  }
};

exports.deleteCategory = async (id) => {
  try {
    await query("DELETE FROM category WHERE category_id = ?", id);
  } catch (err) {
    console.error("Error deleting category:", err);
    throw new Error("Failed to delete category. Please try again later.");
  }
};
