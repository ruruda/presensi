const router = require('express').Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

//! User
router.post('/auth/register', authController.create);
router.post('/auth/login', authController.login);

//! Admin
router.get('/admin/users', adminController.getAllUsers);

module.exports = router;
