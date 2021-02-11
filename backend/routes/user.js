const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id/delete', auth, userCtrl.delete);
//router.get('/getAllUsers', auth, userCtrl.getAllUsers);


module.exports = router;