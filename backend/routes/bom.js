const express = require('express');
const { create, unapproved, update, remove, details, all, removeRawMaterial, removeFinishedGood } = require('../controllers/bom');
const router = express.Router();

router.post('/', create);
router.get('/all', all);
router.get('/unapproved', unapproved);
router.route('/:id')
        .put(update)
        .delete(remove)
        .get(details)
router.delete('/remove/raw-material/:id', removeRawMaterial);
router.delete('/remove/finished-good/:id', removeFinishedGood);

module.exports = router;