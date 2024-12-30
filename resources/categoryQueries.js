const { query } = require('../config/db')

exports.getAllCategories = async () => {
    try {
        const res = await query("SELECT * FROM category")
        return res
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        const res = await query("SELECT * FROM category WHERE category_id = ?", id)
        return res[0]
    } catch (err) {
        throw err
    }
}

exports.createCategory = async (categoryData) => {
    try {
        const res = await query("INSERT INTO `category`(`name`) VALUES (?)", categoryData)
        return res
    } catch (err) {
        throw err
    }
}

exports.updateCategory = async (categoryData) => {
    try {
        const res = await query("UPDATE `category` SET `name`= ? WHERE `category_id` = ?", categoryData)
        return res
    } catch (err) {
        throw err
    }
}

exports.deleteCategory = async (id) => {
    try {
        const res = await query("DELETE FROM category WHERE category_id = ?", id)
    } catch (err) {
        throw err
    }
}