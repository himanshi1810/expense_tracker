import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { expenseEndPoints } from "../api";
const {
    ADD_EXPENSE_API,
    UPDATE_EXPENSE_API,
    VIEW_EXPENSE_API,
    DELETE_EXPENSE_API,
    VIEW_GROUP_DAILY_EXPENSE_API,
    VIEW_GROUP_MONTHLY_EXPENSE_API,
    GROUP_TOTAL_EXPENSE_API,
    VIEW_USER_EXPENSE_API,
    VIEW_RECENT_USER_EXPENSE_API,
    VIEW_USER_MONTHLY_EXPENSE_API,
    VIEW_USER_DAILY_EXPENSE_API
} = expenseEndPoints;

//Add Expense
export const addExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_EXPENSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log("Add Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not add expense");
        }
        toast.success("Expense added successfully");
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while adding expense:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//Update Expense
export const updateExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_EXPENSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log("Update Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not update expense");
        }
        toast.success("Expense updated successfully");
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while updating expense:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//Delete Expense
export const deleteExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Delete Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not delete expense");
        }
        toast.success("Expense deleted successfully");
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while deleting expense:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View Expense
export const viewExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", VIEW_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch expense details");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching expense details:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View Group Daily Expense
export const viewGroupDailyExpenses = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET",VIEW_GROUP_DAILY_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View Group Daily Expenses API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch group daily expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching group daily expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View Group Monthly Expense 
export const viewGroupMonthlyExpenses = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", VIEW_GROUP_MONTHLY_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View Group Monthly Expenses API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch group monthly expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching group monthly expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View Group Total Expense
export const groupTotalExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GROUP_TOTAL_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Group Total Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch group total expense");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching group total expense:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View User Expense
export const viewUserExpense = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", VIEW_USER_EXPENSE_API, {}, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View User Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch user expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching user expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View Recent user expense
export const viewRecentUserExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", VIEW_RECENT_USER_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View Recent User Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch recent user expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching recent user expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View User Monthly Expense
export const viewUserMonthlyExpense = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", VIEW_USER_MONTHLY_EXPENSE_API, {}, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View User Monthly Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch user monthly expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching user monthly expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//View User Daily Expense
export const viewUserDailyExpense = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST",VIEW_USER_DAILY_EXPENSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("View User Daily Expense API Response...", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch user daily expenses");
        }
        result = response?.data;
    } catch (error) {
        console.log("Error occurred while fetching user daily expenses:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};






