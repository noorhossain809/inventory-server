const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/brand.controller")


router.route("/")
.post(brandController.createABrand)
.get(brandController.getAllBrands)

router.route("/:id")
.get(brandController.getBrandById)
.patch(brandController.updateBrand)
.delete(brandController.deleteBrandById)

module.exports = router