const Brand = require("../models/Brand.modal")
const Product = require("../models/Product.model")

exports.getAllProductsServices = async(filters, queries) => {
    const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)

    const totalProducts = await Product.countDocuments()
    const pageCount = Math.ceil(totalProducts/queries.limit)
    return {totalProducts,pageCount, products}
}

exports.createAProductService = async(data) => {
    const product = await Product.create(data)
    const {_id: productId, brand} = product;

    const res = await Brand.updateOne({_id : brand.id}, {$push: {products: productId}})
    return product;
}

exports.updateAProductService = async(productId, data) => {
    const product = await Product.updateOne({_id : productId}, {$set : data}, {runValidators: true})
    return product;
}

exports.bulkUpdateProductService = async(data) => {
    // const product = await Product.updateMany({ _id: data.ids }, data.data, {runValidators: true})
    // return product

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id : product.id}, product.data))
    });

    const result = await Promise.all(products)
    return result;

}

exports.deleteProductServiceById = async(id) => {
    const result = await Product.deleteOne({_id : id})
    return result
}

exports.bulkDeleteProductService = async(ids) => {
    const result = await Product.deleteMany({_id: ids})
    return result;
}