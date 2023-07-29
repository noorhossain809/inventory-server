const express = require("express")
const router = express.Router()
const categoryController = require("../../controllers/category.controller")

router.route("/")
.post(categoryController.createCategory)
.get(categoryController.getAllCategory)

router.route("/:id")
.get(categoryController.getCategoryById)
.patch(categoryController.updateCategoryById)
.delete(categoryController.deleteCategoryById)

module.exports = router;