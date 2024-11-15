const express = require("express");
const { update, create, remove, details, all } = require("../controllers/agent");
const router = express.Router();

router.post('/', create);
router.get('/all', all);
router.route('/:id')
        .put(update)
        .delete(remove)
        .get(details)

module.exports = router;