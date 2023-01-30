const router = require('express').Router();
const authController = require('../controllers/authController');

//! User
router.post('/auth/register', authController.create);

module.exports = router;
