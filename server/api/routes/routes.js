const router = require('express').Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const kehadiranController = require('../controllers/kehadiranController');
const auth = require('../middleware/auth');

//! User
router.post('/auth/register', authController.create);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.getRefresh);
router.get('/auth/me', auth.verifyUser, authController.getMe);

//! Admin
router.get('/admin/users', auth.verifyAdmin, adminController.getAllUsers);

//! Kehadiran
router.put('/kehadiran/update', auth.verifyUser, kehadiranController.updateKehadiran);

module.exports = router;
