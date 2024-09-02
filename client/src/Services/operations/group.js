import { toast } from "react-hot-toast"
import {groupEndPoints} from "../api";
import { apiConnector } from "../apiConnector";
import { setUpdatedGroup } from "../../Reducer/Slices/groupSlice";
const {CREATE_GROUP_API, ADD_MEMBER_CONFIRMATION_API, VIEW_USER_GROUP_API, UPDATE_GROUP_API, MAKE_SETTLEMENT_API, ADD_MEMBERS, VIEW_GROUP_API, DELETE_GROUP_API, BALANCE_SHEET_API, UPDATE_GROUP_IMAGE_API} = groupEndPoints;
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
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_MEMBER_CONFIRMATION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Add member with confirmation api response...............", response);
        if(!response?.data?.success){
            toast.error(response?.data?.message)
            throw new Error("Could not add member/s wih confirmation");
            //toast.dismiss(toastId);
        }
        toast.success("Members added successfully");
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("ADD MEMBERS CONFIRMATION API ERROR...", error);
        toast.error(error.message);
    }
   // toast.dismiss(toastId);
    return result
  }
  export const addMembers = async(data, token) => {
    let result = null;
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_MEMBERS, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Add member api response...............", response);
        if(!response?.data?.success){
            toast.error(response?.data?.message)
            throw new Error("Could not add member/s");
            //toast.dismiss(toastId); 
        }
        toast.success("Members added successfully");
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("ADD MEMBERS API ERROR...", error);
        toast.error(error.message);
    }
    //toast.dismiss(toastId);
    return result
  }
  export const viewGroup = async(data) => {
    let result = null;
    
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", VIEW_GROUP_API, data)
        console.log("View Group api response...............", response);
        if(!response?.data?.success){
            //toast.dismiss(toastId);
            toast.error(response?.data?.message)
            throw new Error("Could not fetch group data"); 
        }
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("VIEW GROUP API ERROR...", error);
        toast.error(error.message);
    }
    //toast.dismiss(toastId);
    return result
  }
  export function deleteGroup(groupId, userId, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      try {
        const data = {
          groupId: groupId,
          userId: userId
        };
  
        const response = await apiConnector("DELETE", DELETE_GROUP_API, data, {
          Authorization: `Bearer ${token}`,
        });
  
        console.log("Delete Group API response: ", response);
  
        if (!response?.data?.success) {
          throw new Error("Could not delete group");
        }
  
        toast.success("Group Deleted successfully");
        dispatch(navigate('/dashboard/group'));
      } catch (error) {
        console.log("DELETE GROUP API ERROR: ", error);
        
      } finally {
        toast.dismiss(toastId);
      }
    };
  }
  
  export const balanceSheet = async(data, token) => {
    let result = null;
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", BALANCE_SHEET_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Balance sheet api response...............", response);
        if(!response?.data?.success){
            //toast.dismiss(toastId);
            toast.error(response?.data?.message)
            throw new Error("Could not create balance sheet");
        }
        toast.success("Balance sheet created successfully");
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("BALANCE SHEET API ERROR...", error);
        toast.error(error.message);
    }
    //toast.dismiss(toastId);
    return result
  }
  export function updateGroup(token, groupData, groupId) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      try {
        const { groupName, groupDescription } = groupData;
  
        const response = await apiConnector("PUT", UPDATE_GROUP_API.replace('${group._id}', groupId), {
            groupName, 
            groupDescription
        }, {
          Authorization: `Bearer ${token}`,
        });
        toast.success("Group Updated Successfully");
        dispatch(setUpdatedGroup(response?.data?.updatedGroupDetails))
        console.log("UPDATE_GROUP_API API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
      } catch (error) {
        console.log("UPDATE_GROUP_API API ERROR............", error);
        toast.error("Could Not Update GROUP");
      }
      toast.dismiss(toastId);
    };
  }

  export const makeSettlement = async(data, token) => {
    let result = null;
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", MAKE_SETTLEMENT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Make Settlement api response...............", response);
        if(!response?.data?.success){
            //toast.dismiss(toastId);
            toast.error(response?.data?.message)
            throw new Error("Could not make settlement");
        }
        toast.success("Settlement done successfully");
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("MAKE SETTLEMENT API ERROR...", error);
        toast.error(error.message);
    }
    //toast.dismiss(toastId);
    return result
  }
  export const viewUserGroup = async(token) => {
    let result = null;
    //const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", VIEW_USER_GROUP_API, {}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET USER GROUP API RESPONSE...............", response);
        if(!response?.data?.success){
            //toast.dismiss(toastId);
            toast.error(response?.data?.message)
            throw new Error("Could not fetch user groups");
        }
        toast.success("User Groups Fetched successfully");
        result = response?.data
    } catch (error) {
        //toast.dismiss(toastId);
        console.log("FETCH USER GROUPS API ERROR...", error);
        toast.error(error.message);
    }
    //toast.dismiss(toastId);
    return result
  }

  export function updateGroupImage(token, formData,groupId) {
    return async (dispatch) => {
      //const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT",
          UPDATE_GROUP_IMAGE_API.replace('${group._id}', groupId),
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_GROUP_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Group Image Updated Successfully")
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      //toast.dismiss(toastId)
    }
  }
  