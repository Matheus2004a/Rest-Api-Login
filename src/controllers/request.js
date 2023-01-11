const mysql = require("../../mysql").pool
const ServicesRequest = require("../services/ServiceRequest")

exports.getRequests = (req, res) => ServicesRequest.getRequests(req, res)
exports.getRequest = (req, res) => ServicesRequest.getRequestById(req, res)
exports.postRequest = (req, res) => ServicesRequest.createRequest(req, res)
exports.updateRequest = (req, res) => ServicesRequest.updateRequestById(req, res)
exports.deleteRequest = (req, res) => ServicesRequest.deleteRequestById(req, res)