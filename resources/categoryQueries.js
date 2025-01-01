const { query } = require('../config/db')

exports.getAllCategories = async () => {
    try {
        const res = await query("SELECT * FROM category")
        let dataArr = [];
        res.forEach(value => {
            dataArr.push({
                id: value.category_id,
                categoryName: value.name,
            })
        })
        return dataArr;
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        const res = await query("SELECT * FROM category WHERE category_id = ?", id)
        let dataArr = [];
        res.forEach(value => {
            dataArr.push({
                id: value.category_id,
                categoryName: value.name,
            })
        })
        return dataArr[0];
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