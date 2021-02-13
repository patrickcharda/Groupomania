const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const uploadFileMiddleware = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/all', auth, postCtrl.getAllPosts);
router.post('/create', auth, postCtrl.create);
router.delete('/:id/:publisherId/delete', auth, postCtrl.delete);
router.delete('/:id/:publisherId/deleteByAdmin', authAdmin, postCtrl.deleteByAdmin);
//router.post('/', auth, multer, sauceCtrl.createSauce);
//router.get('/:id', auth, sauceCtrl.getOneSauce);
//router.get('/:id', sauceCtrl.getOneSauce);
//router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//router.delete('/:id', auth, sauceCtrl.deleteSauce);
//router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
