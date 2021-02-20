const express = require('express');
const router = express.Router();

const authAdmin = require('../middleware/authAdmin');
const adminCtrl = require('../controllers/admin');

router.delete('/user/:id/deleteByAdmin', authAdmin, adminCtrl.delete);
router.get('/getAllUsers', authAdmin, adminCtrl.getAllUsers);

module.exports = router;