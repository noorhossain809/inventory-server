const Brand = require("../models/Brand.modal")

module.exports.createBrandService = async(data) => {
    const result = await Brand.create(data)
    return result;
}

module.exports.getBrandsService = async() => {
    const brands = await Brand.find({}).populate('products').populate('suppliers')
    return brands
}

module.exports.getBrandByIdService = async(id) => {
    const brand = await Brand.findOne({_id: id}).populate('suppliers')
    return brand;
}

module.exports.updateBrandService = async(id, data) => {
    const result = await Brand.updateOne({_id: id}, data, {runValidators: true})
    return result;
}

module.exports.deleteBrandService = async(id) => {
    const brand = await Brand.deleteOne({_id: id})
    return brand
}