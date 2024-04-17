const express = require("express");
const { auth } = require("../middlewares/auth");
const { addExpense, editExpense, viewExpense, deleteExpense } = require("../controllers/Expense");
const router = express.Router();

router.post("/addExpense", auth, addExpense);
router.post("/updateExpense", auth, editExpense);
router.get("/viewExpense", viewExpense);
router.delete("/deleteExpense", auth, deleteExpense);
module.exports = router;