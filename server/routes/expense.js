const express = require("express");
const { auth } = require("../middlewares/auth");
const { addExpense, editExpense, viewExpense, deleteExpense, viewGroupDailyExpenses, viewGroupMonthlyExpenses, groupTotalExpense } = require("../controllers/Expense");
const router = express.Router();

router.post("/addExpense", auth, addExpense);
router.post("/updateExpense", auth, editExpense);
router.get("/viewExpense", viewExpense);
router.delete("/deleteExpense", auth, deleteExpense);
router.get("/viewGroupDailyExpenses", auth, viewGroupDailyExpenses);
router.get("/viewGroupMonthlyExpenses", auth, viewGroupMonthlyExpenses);
router.get("/viewGroupDailyExpenses", auth, viewGroupDailyExpenses);
router.get("/groupTotalExpense", auth, groupTotalExpense);
module.exports = router;