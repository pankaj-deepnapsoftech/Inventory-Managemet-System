const express = require('express');
const { create, details, update, remove, all, unapproved } = require('../controllers/store');
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post('/', isAuthenticated, create);
router.get('/all', all);
router.get('/unapproved', unapproved);
router.route('/:id')
        .get(isAuthenticated, details)
        .put(isAuthenticated, update)
        .delete(isAuthenticated, remove)

module.exports = router;