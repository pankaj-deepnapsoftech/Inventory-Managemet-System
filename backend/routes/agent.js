const express = require("express");
const { update, create, remove, details, allBuyers, allSelllers, unapprovedBuyers, unapprovedSellers } = require("../controllers/agent");
const router = express.Router();

router.post('/', create);
router.get('/buyers', allBuyers);
router.get('/sellers', allSelllers);
router.get('/unapproved-buyers', unapprovedBuyers);
router.get('/unapproved-sellers', unapprovedSellers);
router.get('/sellers', allSelllers);
router.route('/:id')
        .put(update)
        .delete(remove)
        .get(details)

module.exports = router;