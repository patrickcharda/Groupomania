const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/all', auth, postCtrl.getAllPosts);
router.post('/newone', auth, postCtrl.newPost);
//router.post('/', auth, multer, sauceCtrl.createSauce);
//router.get('/:id', auth, sauceCtrl.getOneSauce);
//router.get('/:id', sauceCtrl.getOneSauce);
//router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//router.delete('/:id', auth, sauceCtrl.deleteSauce);
//router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
