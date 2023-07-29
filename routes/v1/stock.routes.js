const express = require("express")
const router = express.Router()
const stockController = require("../../controllers/stock.controller")

router.route("/")
.post(stockController.createStock)
.get(stockController.getStock)

module.exports = router