const express = require("express");
const router = express.Router()
const productRoute = require("../../controllers/product.controller");
const uploader = require("../../middleware/uploader");


router.post('/file-upload', uploader.single("image"), productRoute.fileUpload)

// QUERY
router.route("/")
.get(productRoute.getAllProducts)
.post(productRoute.saveAProduct)

router.route("/bulk-update")
.patch(productRoute.bulkUpdateProduct)
.delete(productRoute.bulkDeleteProduct)  

router.route("/:id")
  .get(productRoute.getProductById)
  .patch(productRoute.updateAProduct)
  .delete(productRoute.deleteProductById)

  
module.exports = router