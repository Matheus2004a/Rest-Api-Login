const express = require("express")
const router = express.Router()
const multer = require("multer")
const login = require("../middleware/login")
const ProductsController = require("../controllers/product")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/")
    },
    filename: (req, file, callback) => {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        callback(null, data + file.originalname)
    }
})

const upload = multer({ storage })

router.get("/products", ProductsController.getProducts)
router.get("/products/:id", ProductsController.getProduct)
router.post("/products", login.required, upload.single("image"), ProductsController.postProduct)
router.patch("/products/:id", login.required, ProductsController.updateProduct)
router.delete("/products/:id", login.required, ProductsController.deleteProduct)

module.exports = router