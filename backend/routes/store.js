const express = require('express');
const { create, details, update, remove, all } = require('../controllers/store');
const router = express.Router();

router.post('/', create);
router.get('/all', all);
router.route('/:id')
        .get(details)
        .put(update)
        .delete(remove)

module.exports = router;