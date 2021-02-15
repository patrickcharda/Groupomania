const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const uploadFileMiddleware = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.get('/:post_id/view', auth, commentCtrl.getPostComments);
router.post('/new', auth, commentCtrl.create);
router.delete('/:comment_id/delete', auth, commentCtrl.delete);
router.delete('/:comment_id/deleteByAdmin', authAdmin, commentCtrl.deleteByAdmin);
//router.delete('/:id/:publisherId/deleteByAdmin', authAdmin, postCtrl.deleteByAdmin);
//router.post('/', auth, multer, sauceCtrl.createSauce);
//router.get('/:id', auth, sauceCtrl.getOneSauce);
//router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id/update', auth, commentCtrl.update);
router.put('/:id/updateByAdmin', authAdmin, commentCtrl.updateByAdmin);
//router.put('/:id/updateByAdmin', authAdmin, postCtrl.updateByAdmin);
//router.delete('/:id', auth, sauceCtrl.deleteSauce);
//router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
