const express = require("express")
const router = express.Router()
const supplierController = require("../../controllers/supplier.controller")


router.route("/")
.post(supplierController.createSupplier)
.get(supplierController.getSupplier)

module.exports = router;