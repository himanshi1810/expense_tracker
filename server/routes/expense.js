const express = require("express");
const { auth } = require("../middlewares/auth");
const { addExpense, editExpense, viewExpense, deleteExpense, viewGroupDailyExpenses, viewGroupMonthlyExpenses, groupTotalExpense,viewUserExpenses, viewRecentUserExpenses, viewUserMonthlyExpense, viewUserDailyExpense } = require("../controllers/Expense");
const router = express.Router();

router.post("/addExpense", auth, addExpense);
router.post("/updateExpense", auth, editExpense);
router.get("/viewExpense", viewExpense);
router.delete("/deleteExpense", auth, deleteExpense);
router.get("/viewGroupDailyExpenses", auth, viewGroupDailyExpenses);
router.get("/viewGroupMonthlyExpenses", auth, viewGroupMonthlyExpenses);
router.get("/viewGroupDailyExpenses", auth, viewGroupDailyExpenses);
router.get("/groupTotalExpense", auth, groupTotalExpense);
router.post("/viewUserExoense", auth, viewUserExpenses);
router.post("/viewecentUserExpense", auth, viewRecentUserExpenses);
router.post("/viewUserMonthlyExpense", auth, viewUserMonthlyExpense);
router.post("/viewUserDailyExpense", auth, viewUserDailyExpense);
module.exports = router;