const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const authAdmin = require('../middleware/authAdmin');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id/delete', auth, userCtrl.delete);
router.delete('/user/:id/deleteByAdmin', authAdmin, userCtrl.deleteByAdmin);
router.get('/getAllUsers', authAdmin, userCtrl.getAllUsers);



module.exports = router;