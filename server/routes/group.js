const express = require("express");
const { auth } = require("../middlewares/auth");
const { createGroup, addMemberConfirmation, updateGroup, viewGroup, addMembers, deleteGroup, makeSettlement, balanceSheet, viewUserGroups } = require("../controllers/Group");


const router = express.Router();

router.post("/createGroup", auth, createGroup);
router.post("/addMemberConfirmation", auth, addMemberConfirmation);
router.post("/updateGroup", auth, updateGroup);
router.get("/viewGroup", viewGroup);
router.get("/viewUserGroup", auth, viewUserGroups);
router.post("/addMembers", auth, addMembers);
router.delete("/deleteGroup", auth, deleteGroup);
router.post("/makeSettlement", auth, makeSettlement);
router.post("/balanceSheet", auth, balanceSheet);
module.exports = router