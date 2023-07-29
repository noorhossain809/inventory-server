const { createSupplierService, getSupplierService } = require("../services/supplied.service")

module.exports.createSupplier = async(req, res, next) => {
    try {
        const result = await createSupplierService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Supplier created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Data is not inserted",
            error: error.message
        })
    }
}

module.exports.getSupplier = async(req, res, next) => {
    try {
        const supplier = await getSupplierService()

        res.status(200).json({
            status: 'success',
            message: 'Data get successfully',
            data: supplier
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data can not get successfully',
            error: error.message
        })
    }
}