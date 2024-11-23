const express = require("express");
const { update, create, remove, details, allBuyers, unapprovedBuyers, unapprovedSuppliers, allSuppliers } = require("../controllers/agent");
const router = express.Router();

router.post('/', create);
router.get('/buyers', allBuyers);
router.get('/suppliers', allSuppliers);
router.get('/unapproved-buyers', unapprovedBuyers);
router.get('/unapproved-suppliers', unapprovedSuppliers);
router.route('/:id')
        .put(update)
        .delete(remove)
        .get(details)

module.exports = router;