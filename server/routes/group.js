const express = require("express");
const { auth } = require("../middlewares/auth");
const { createGroup, addMemberConfirmation, updateGroup, viewGroup, addMembers, deleteGroup, makeSettlement, balanceSheet, viewUserGroups, updateGroupImage } = require("../controllers/Group");

const router = express.Router();

router.post("/createGroup", auth, createGroup);
router.post("/addMemberConfirmation", auth, addMemberConfirmation);
router.put("/updateGroup/:id", auth, updateGroup);
router.put("/updateGroupImage/:id", auth, updateGroupImage)
router.post("/viewGroup", viewGroup);
router.get("/viewUserGroup", auth, viewUserGroups);
router.post("/addMembers", auth, addMembers);
router.delete("/deleteGroup", auth, deleteGroup);
router.post("/makeSettlement", auth, makeSettlement);
router.post("/balanceSheet", auth, balanceSheet);

module.exports = router;
