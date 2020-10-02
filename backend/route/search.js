const express = require("express");
const router = express.Router();
const shopCtrl = require("../controller/shop");

router.get("/:search", shopCtrl.search);

module.exports = router;
