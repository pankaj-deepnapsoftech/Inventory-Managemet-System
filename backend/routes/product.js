const express = require("express");
const { create, update, remove, details, all } = require("../controllers/product");
const router = express.Router();

router.route("/").post(create).put(update).delete(remove);
router.get("/all", all);
router.get("/:id", details);

module.exports = router;
