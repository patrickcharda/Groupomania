const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
//const uploadFileMiddleware = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.get('/:post_id/view', auth, commentCtrl.getPostComments);
router.post('/new', auth, commentCtrl.create);
router.delete('/:comment_id/delete', auth, commentCtrl.delete);
router.delete('/:comment_id/deleteByAdmin', authAdmin, commentCtrl.deleteByAdmin);
router.put('/:id/update', auth, commentCtrl.update);
router.put('/:id/updateByAdmin', authAdmin, commentCtrl.updateByAdmin);

module.exports = router;
