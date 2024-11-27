const express = require('express');
const { create, unapproved, update, remove, details, all } = require('../controllers/bom');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router = express.Router();

router.post('/', isAuthenticated, create);
router.get('/all', all);
router.get('/unapproved', isAuthenticated, unapproved);
router.route('/:id')
        .put(isAuthenticated, update)
        .delete(isAuthenticated, remove)
        .get(isAuthenticated, details)
// router.delete('/remove/raw-material/:id', isAuthenticated, removeRawMaterial);
// router.delete('/remove/finished-good/:id', isAuthenticated, removeFinishedGood);

module.exports = router;