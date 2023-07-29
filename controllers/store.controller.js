const { createStoreService, getStoreService, getStoreServiceById, updateStoreServiceById, deleteStoreServiceById } = require("../services/store.service")

module.exports.createStore = async(req, res, next) => {
    try {
        const result = await createStoreService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Store create successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store can not created successfully',
            error: error.message
        })
    }
}
module.exports.getAllStore = async(req, res, next) => {
    try {
        const stores = await getStoreService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Store get successfully',
            data: stores
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store can not get successfully',
            error: error.message
        })
    }
}
module.exports.getStoreById = async(req, res, next) => {
    const {id} = req.params;
    try {
        const store = await getStoreServiceById(id)
        if(!store){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't find the store with this id."
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Store get successfully by the id. ',
            data: store
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store can not get successfully',
            error: error.message
        })
    }
}
module.exports.updateStoreById = async(req, res, next) => {
    const {id} = req.params;
    try {
        const store = await updateStoreServiceById(id, req.body)
        if(!store.nModified){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't update the store with this id."
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Store update successfully. ',
            data: store
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store can not update successfully',
            error: error.message
        })
    }
}
module.exports.deleteStoreById = async(req, res, next) => {
    const {id} = req.params;
    try {
        const store = await deleteStoreServiceById(id)
        // if(!store){
        //     return res.status(400).json({
        //         status: 'fail',
        //         message: "Couldn't find the store with this id."
        //     })
        // }
        res.status(200).json({
            status: 'success',
            message: 'Store delete successfully. ',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store can not delete successfully',
            error: error.message
        })
    }
}