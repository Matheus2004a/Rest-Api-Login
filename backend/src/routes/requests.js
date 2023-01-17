const express = require("express")
const router = express.Router()
const RequestController = require("../controllers/request")

router.get("/pedidos", RequestController.getRequests)
router.get("/pedidos/:id", RequestController.getRequest)
router.post("/pedidos", RequestController.postRequest)
router.patch("/pedidos/:id", RequestController.updateRequest)
router.delete("/pedidos/:id", RequestController.deleteRequest)

module.exports = router