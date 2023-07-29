const Store = require("../models/store.model")

module.exports.createStoreService = async(data) => {
    const result = await Store.create(data)
    return result;
}
module.exports.getStoreService = async() => {
    const stores = await Store.find({})
    return stores;
}
module.exports.getStoreServiceById = async(id) => {
    const store = await Store.findOne({_id: id})
    return store;
}
module.exports.updateStoreServiceById = async(id, data) => {
    const result = await Store.updateOne({_id: id}, data, {runValidators: true})
    return result;
}
module.exports.deleteStoreServiceById = async(id) => {
    const store = await Store.deleteOne({_id: id})
    return store;
}