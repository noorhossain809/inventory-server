const Category = require("../models/Category.model")

module.exports.createCategoryService = async(data) => {
    const result = await Category.create(data)
    return result
}

module.exports.getCategoryService = async() => {
    const category = await Category.find({})
    return category;
}
module.exports.getCategoryByIdService = async(id) => {
    const category = await Category.findOne({_id: id})
    return category;
}
module.exports.updateCategoryByIdService = async(id, data) => {
    const result = await Category.updateOne({_id: id}, data, {runValidators: true})
    return result;
}
module.exports.deleteCategoryByIdService = async(id) => {
    const category = await Category.deleteOne({_id: id})
    return category;
}