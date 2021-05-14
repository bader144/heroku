const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/register', userController.registr);
router.get('/register', userController.sorting);
router.get('/expense/:month?', userController.get);
module.exports = router;