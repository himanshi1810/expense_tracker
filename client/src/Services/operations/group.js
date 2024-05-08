import { toast } from "react-toastify";
import {groupEndPoints} from "../api";
import { apiConnector } from "../apiConnector";
const {CREATE_GROUP_API, ADD_MEMBER_CONFIRMATION_API, VIEW_USER_GROUP_API, UPDATE_GROUP_API, MAKE_SETTLEMENT_API, ADD_MEMBERS, VIEW_GROUP_API, DELETE_GROUP_API, BALANCE_SHEET_API} = groupEndPoints;
export const createGroup = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_GROUP_API , data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE GROUP API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add GROUP Details");
        toast.dismiss(toastId);
        toast.error(response?.data?.message)
      }
      toast.success("GROUp Details Added Successfully")
      result = response?.data
    } catch (error) {
      console.log("CREATE GROUP API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const addMemberConfirmation = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_MEMBER_CONFIRMATION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Add member with confirmation api response...............", response);
        if(!response?.data?.success){
            throw new Error("Could not add member/s wih confirmation");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Members added successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("ADD MEMBERS CONFIRMATION API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  export const addMembers = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_MEMBERS, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Add member api response...............", response);
        if(!response?.data?.success){
            throw new Error("Could not add member/s");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Members added successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("ADD MEMBERS API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  export const viewGroup = async(data) => {
    let result = null;
    
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", VIEW_GROUP_API, data)
        console.log("View Group api response...............", response);
        if(!response?.data?.success){
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
            throw new Error("Could not fetch group data"); 
        }
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("VIEW GROUP API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  export const deleteGroup = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_GROUP_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Delete Group api response...............", response);
        if(!response?.data?.success){
            throw new Error("Could not delete group");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Group Deleted successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("DELETE GROUP API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  export const balanceSheet = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", BALANCE_SHEET_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Balance sheet api response...............", response);
        if(!response?.data?.success){
            throw new Error("Could not create balance sheet");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Balance sheet created successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("BALANCE SHEET API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }

  export const updateGroup = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_GROUP_API, data, {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        });
        console.log("Update Group Api Response...", response);
        if(!response?.data?.success){
            throw new Error("Counl'd not update group");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Group updated successfully");
        result = response?.data;
    } catch (error) {
        toast.dismiss(toastId);
        console.log("ERROR WHILE UPDATING GROUP...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
  }
  export const makeSettlement = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", MAKE_SETTLEMENT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Make Settlement api response...............", response);
        if(!response?.data?.success){
            throw new Error("Could not make settlement");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("Settlement done successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("MAKE SETTLEMENT API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  export const viewUserGroup = async(token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", VIEW_USER_GROUP_API, {}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET USER GROUP API RESPONSE...............", response);
        if(!response?.data?.success){
            throw new Error("Could not fetch user groups");
            toast.dismiss(toastId);
            toast.error(response?.data?.message)
        }
        toast.success("User Groups Fetched successfully");
        result = response?.data
    } catch (error) {
        toast.dismiss(toastId);
        console.log("FETCH USER GROUPS API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result
  }
  