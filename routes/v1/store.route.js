const express = require("express")
const router = express.Router()
const storeController = require("../../controllers/store.controller")


router.route("/")
.post(storeController.createStore)
.get(storeController.getAllStore)

router.route("/:id")
.get(storeController.getStoreById)
.patch(storeController.updateStoreById)
.delete(storeController.deleteStoreById)

module.exports = router;