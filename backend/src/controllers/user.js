const ServiceUser = require("../services/ServiceUser")

exports.getUsers = (req, res) => ServiceUser.getAllUsers(req, res)
exports.getUser = (req, res) => ServiceUser.getUserById(req, res)
exports.postUser = (req, res, next) => ServiceUser.createUser(req, res, next)
exports.updateUser = (req, res) => ServiceUser.updateUserById(req, res)
exports.deleteUser = (req, res) => ServiceUser.deleteUserById(req, res)
exports.loginUser = (req, res, next) => ServiceUser.loginUser(req, res, next)