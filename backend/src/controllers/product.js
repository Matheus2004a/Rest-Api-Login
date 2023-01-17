const ProductServices = require("../services/ServiceProducts")

exports.getProducts = (req, res) => ProductServices.getProducts(req, res)
exports.getProduct = (req, res) => ProductServices.getProduct(req, res)
exports.postProduct = (req, res) => ProductServices.createProduct(req, res)
exports.updateProduct = (req, res) => ProductServices.updateProduct(req, res)
exports.deleteProduct = (req, res) => ProductServices.deleteProduct(req,res)