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
router.put('/:id', auth, postCtrl.update);
router.put('/:id/updateByAdmin', authAdmin, postCtrl.updateByAdmin);

module.exports = router;
