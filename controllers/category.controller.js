const { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryByIdService, deleteCategoryByIdService } = require("../services/category.service")

module.exports.createCategory = async(req, res, next) => {
    try {
        const result = await createCategoryService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Successfully create the category',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the category",
            error: error.message
        })
    }


}

module.exports.getAllCategory = async(req, res, next) => {
    try {
        const category = await getCategoryService()

        res.status(200).json({
            status: 'success',
            message: 'Successfully get the all category',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't get the category",
            error: error.message
        })
    }
}
module.exports.getCategoryById = async(req, res, next) => {
    const {id} = req.params
    try {
        const category = await getCategoryByIdService(id)

        if(!category){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't find the brand with this id."
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully get the category',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't get the category",
            error: error.message
        })
    }
}
module.exports.updateCategoryById = async(req, res, next) => {
    const {id} = req.params
    try {
        const result = await updateCategoryByIdService(id, req.body)

        if(!category.nModified){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't update the brand with this id."
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully update the category',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the category",
            error: error.message
        })
    }
}
module.exports.deleteCategoryById = async(req, res, next) => {
    const {id} = req.params
    try {
        const category = await deleteCategoryByIdService(id)

        if(!category.deletedCount){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't find the category with this id."
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully delete the category',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't delete the category",
            error: error.message
        })
    }
}