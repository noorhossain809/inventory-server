const Stock = require("../models/Stock.model")

module.exports.createStockService = async(data) => {
    const result = await Stock.create(data)
    return result;
}

module.exports.getStockService = async() => {
    const stock = await Stock.find({}).populate("store")
    return stock
}