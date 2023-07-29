const { ObjectId } = require("mongodb");
const Product = require("../models/Product.model");
const { getAllProductsServices, createAProductService, updateAProductService, bulkUpdateProductService, deleteProductServiceById, bulkDeleteProductService } = require("../services/product.service");

module.exports.getAllProducts = async(req, res) => {
    try {
      console.log(req.query)
      let filters = {...req.query};
      
      // sort, page, limit ---> exclude
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach(field => delete filters[field])
      console.log(filters)

      // gt, gte, lt, lte
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
      filters = JSON.parse(filtersString)

      const queries = {}

      if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queries.sortBy = sortBy
      }

      if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queries.fields = fields
      }
      if(req.query.page){
        const {page = 1, limit = 10} = req.query;
        const skip = (page-1)*parseInt(limit)
        queries.skip = skip
        queries.limit = parseInt(limit)
      }


      const products = await getAllProductsServices(filters,queries)
      res.status(200).json({
        status : 'success',
        message: "Data get successfully",
        data : products
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: "can't get the data",
        error: error.message
      })
    }
  }

module.exports.getProductById = async(req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findById({_id : ObjectId(id)})
      res.status(200).json({
        status : 'success',
        message: "Data get successfully",
        data : product
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: "can't get the data",
        error: error.message
      })
    }
  }
  
module.exports.saveAProduct = async(req, res) => {
    console.log(req.body);
    try {
        // save or create product data
  
  
    // for save
    // const product = new Product(req.body)
    // const result = await product.save()

    // for create
    const result = await createAProductService(req.body)
      
    // result.logger()
    
    
  
    res.status(200).json({
      status: 'success',
      message: 'Data inserted successfully',
      data: result
    })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'Data is not inserted',
        error: error.message
      })
    }
  }  

module.exports.updateAProduct = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await updateAProductService(id, req.body)

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: result
    })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
          })
    }
}

module.exports.bulkUpdateProduct = async(req, res, next) => {
   
    try {
        const result = await bulkUpdateProductService(req.body)

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: result
    })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
          })
    }
}

module.exports.deleteProductById = async (req, res, next) => {
  try {
    const {id} = req.params;
  const result = await deleteProductServiceById(id);

  if(!result.deletedCount){
    res.status(200).json({
      status: 'fail',
      message: "Product Id couldn't find."
    })
  }

  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully!!',
    data: result
  })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Product is not delete successfully!!!',
      error: error.message
    })
  }
}

module.exports.bulkDeleteProduct = async(req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids)
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully.',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Product is not delete successfully!!!',
      error: error.message
    })
  }
}

exports.fileUpload = (req, res) => {
  try {
    res.status(200).json(req.files)
  } catch (error) {
    
  }
}