const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService, deleteBrandService } = require("../services/brand.service")

module.exports.createABrand = async(req, res, nex) => {
    try {
        const result = await createBrandService(req.body)
        
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the brand',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the brand",
            error: error.message
        })
    }
}

module.exports.getAllBrands = async(req, res, next) => {
    try {
        const brands = await getBrandsService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Brand product get successfully',
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't get the brands",
            error: error.message
        })
    }
}

module.exports.getBrandById = async(req, res, next) => {
    const {id} = req.params
    try {
        const brand = await getBrandByIdService(id)

        if(!brand){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't find the brand with this id."
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Brand product get successfully',
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't get the brands",
            error: error.message
        })
    }
}

module.exports.updateBrand = async(req, res, next) => {
    const {id} = req.params
    try {
        const result = await updateBrandService(id, req.body)

        if(!result.nModified){
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't update the brand with this id. " 
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Brand update product successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the brands",
            error: error.message
        })
    }
}

module.exports.deleteBrandById = async(req, res, next) => {
    const {id} = req.params;

    try {
        const brand = await deleteBrandService(id)

        if(!brand.deletedCount){
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't find the brand with this id. " 
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Brand delete successfully',
            data: brand
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the brands",
            error: error.message
        })
    }
}