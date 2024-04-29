const BASE_URL = process.env.BASE_URL;

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