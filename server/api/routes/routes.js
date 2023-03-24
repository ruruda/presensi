const router = require('express').Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const kehadiranController = require('../controllers/kehadiranController');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//! User
router.post('/auth/register', authController.create);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.getRefresh);
router.get('/auth/me', auth.verifyUser, authController.getMe);
router.put('/user/kehadiran', auth.verifyUser, kehadiranController.updateKehadiran);
router.get('/user/lasthadir/:uuid', auth.verifyUser, kehadiranController.getLastKehadiranById);
router.get('/user/kehadiran/:uuid', auth.verifyUser, kehadiranController.getKehadiranById);
router.get('/user/:uuid', auth.verifyUser, userController.getUser);
router.put('/user/:uuid', auth.verifyUser, userController.updateUser);

//! Admin
router.post('/admin/login', adminController.adminLogin);
router.get('/admin/users', auth.verifyAdmin, adminController.getAllUsers);
router.put('/admin/user/:uuid', auth.verifyAdmin, adminController.adminUpdateUser);
router.delete('/admin/user/:uuid', auth.verifyAdmin, adminController.deleteUser);
router.get('/admin/kehadiran', auth.verifyAdmin, adminController.getAllKehadiran);
router.put('/admin/kehadiran/reset', auth.verifyAdmin, kehadiranController.resetKehadiran);
router.get('/admin/qrcode', auth.verifyAdmin, kehadiranController.generateCode);

module.exports = router;
