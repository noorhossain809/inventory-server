const Supplier = require("../models/Supplier.models")

module.exports.createSupplierService = async(data) => {
    const result = await Supplier.create(data)
    return result;
}

module.exports.getSupplierService = async() => {
    const supplier = await Supplier.find({}).populate('brand')
    return supplier
}