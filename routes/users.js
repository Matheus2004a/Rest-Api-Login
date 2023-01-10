const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user")

router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getUser)
router.post("/users/signup", UserController.postUser)
router.patch("/users/signup/:id", UserController.updateUser)
router.delete("/users/:id", UserController.deleteUser)
router.post("/users/login", UserController.loginUser)

module.exports = router