const BASE_URL = process.env.REACT_APP_BASE_URL

export const groupEndPoints = {
    CREATE_GROUP_API : BASE_URL + "/group/createGroup",
    ADD_MEMBER_CONFIRMATION_API : BASE_URL + "/group/addMemberConfirmation",
    UPDATE_GROUP_API : BASE_URL + "/group/updateGroup",
    VIEW_GROUP_API : BASE_URL + "/group/viewGroup",
    ADD_MEMBERS : BASE_URL + "/group/addMembers",
    DELETE_GROUP_API : BASE_URL + "/group/deleteGroup",
    MAKE_SETTLEMENT_API : BASE_URL + "/group/makeSettlement",
    BALANCE_SHEET_API : BASE_URL + "/group/balanceSheet"
}
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API:  BASE_URL + "/auth/reset-password",
  }
  
export const expenseEndPoints = {
    ADD_EXPENSE_API : BASE_URL + "/expense/addExpense",
    UPDATE_EXPENSE_API : BASE_URL + "/expense/updateExpense",
    VIEW_EXPENSE_API : BASE_URL + "/expense/viewExpense",
    DELETE_EXPENSE_API : BASE_URL + "/expense/deleteExpense",
    VIEW_GROUP_DAILY_EXPENSE_API : BASE_URL + "/expense/viewGroupDailyExpenses",
    VIEW_GROUP_MONTHLY_EXPENSE_API : BASE_URL + "/expense/viewGroupMonthlyExpenses",
    GROUP_TOTAL_EXPENSE_API : BASE_URL + "/expense/groupTotalExpense",
    VIEW_USER_EXPENSE_API : BASE_URL + "/expense/viewUserExpense",
    VIEW_RECENT_USER_EXPENSE_API : BASE_URL + "/expense/viewRecentUserExpense",
    VIEW_USER_MONTHLY_EXPENSE_API : BASE_URL + "/expense/viewUserMonthlyExpense",
    VIEW_USER_DAILY_EXPENSE_API : BASE_URL + "/expense/viewUserDailyExpense"

}

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/profile/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
 }