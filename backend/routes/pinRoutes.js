const express = require("express");
const router = express.Router();

const {
  getPIN,
  setPIN,
  updatePIN,
  deletePIN,
} = require("../controllers/pinController");

router.route("/").get(getPIN).post(setPIN);
router.route("/:id").delete(deletePIN).put(updatePIN);

module.exports = router;
