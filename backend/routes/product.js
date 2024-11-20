const express = require("express");
const { create, update, remove, details, all, unapproved } = require("../controllers/product");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").post(isAuthenticated, create).put(isAuthenticated, update).delete(isAuthenticated, remove);
router.get("/all", all);
router.get("/unapproved", isAuthenticated, unapproved);
router.get("/:id", details);

module.exports = router;
