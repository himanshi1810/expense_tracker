const express = require("express");
const { auth } = require("../middlewares/auth");
const { addExpense, editExpense, viewExpense, deleteExpense, viewGroupDailyExpenses, viewGroupMonthlyExpenses, groupTotalExpense,viewUserExpenses, viewRecentUserExpenses, viewUserMonthlyExpense, viewUserDailyExpense, viewGroupRecentExpense, fetchGroupMembers } = require("../controllers/Expense");
const router = express.Router();

router.post("/addExpense/:id", auth, addExpense);
router.get("/fetchGroupMembers/:id", fetchGroupMembers);
router.post("/updateExpense", auth, editExpense);
router.get("/viewExpense", viewExpense);
router.delete("/deleteExpense", auth, deleteExpense);
router.post("/viewGroupDailyExpenses", auth, viewGroupDailyExpenses);
router.post("/viewGroupMonthlyExpenses", auth, viewGroupMonthlyExpenses);
router.get("/groupTotalExpense", auth, groupTotalExpense);
router.post("/viewUserExpense", auth, viewUserExpenses);
router.post("/viewRecentUserExpense", auth, viewRecentUserExpenses);
router.post("/viewUserMonthlyExpense", auth, viewUserMonthlyExpense);
router.post("/viewUserDailyExpense", auth, viewUserDailyExpense);
router.post("/viewGroupRecentExpense", auth, viewGroupRecentExpense);
module.exports = router;