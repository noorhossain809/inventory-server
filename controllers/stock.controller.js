const { createStockService, getStockService } = require("../services/stock.service")

module.exports.createStock = async(req, res, next) => {
    try {
        const result = await createStockService(req.body)
        res.status(200).json({
            status: 'success',
            message: "Stock create successfully",
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

module.exports.getStock = async(req, res, next) => {
    try {
        const stock = await getStockService()
        res.status(200).json({
            status: 'success',
            message: 'Stock product get successfully',
            data: stock
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Stock product can not get successfully',
            error: error.message
        })

    }
}