const { simplifyDebts } = require("../helpers/simplyfyDebts");
const Group = require("../models/Group");
const Settlement = require("../models/Settlement");
const User = require("../models/User");
const { confirmationEmail } = require("../templates/confirmationEmail");
const { emailVerification } = require("../templates/emailVerification");
const mailSender = require("../utils/mailSender");

exports.createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, groupCurrency, groupOwner, groupMembers, groupType } = req.body;
        // console.log("groupOwner:", groupOwner);
        // console.log("groupMembers before inclusion:", groupMembers);

        // Ensure uniqueness and include the group owner in the list of group members
          // Fetch the group owner from the database
        const groupOwnerId = await User.findById(groupOwner);
          // Extract the email of the group owner
        const groupOwnerEmail = groupOwnerId.email;
        const allGroupMembers = Array.from(new Set([...groupMembers, groupOwnerEmail]));

        let groupImage = `https://api.dicebear.com/5.x/initials/svg?seed=${groupName}`;
        if (req.files && req.files.groupImage) {
            const image = req.files.groupImage;
            groupImage = await imageUpload(image, process.env.FOLDER_NAME, 1000, 1000);
        }

        if (!groupName) {
            return res.status(400).json({
                success: false,
                message: "Group Name is required"
            });
        }

        const memberList = [];
        const notAddedMembers = [];
        for (const memberEmail of allGroupMembers) {
            const user = await User.findOne({ email: memberEmail });
            if (!user) {
                const confirmationTemplate = confirmationEmail(groupOwner, groupName, "http://gmail.com");
                const mail = await mailSender(memberEmail, "Confirmation Email", confirmationTemplate);
                notAddedMembers.push(memberEmail);
            } else {
                memberList.push(user._id);
            }
        }
        // if(!memberList.includes(groupOwner)){
        //     memberList.push(groupOwner);
        // }
        let split = [];
        split[0] = {};
        for (let groupMember of memberList) {
            split[0][groupMember] = Number(0);
        }

        const groupData = {
            groupName: groupName,
            groupDescription: groupDescription,
            groupCurrency: "INR",
            groupOwner: groupOwner,
            groupMembers: memberList,
            groupTotal: 0,
            groupType: groupType,
            createdAt: Date.now(),
            groupImage: groupImage,
            split: split
        }

        const newGroup = await Group.create(groupData);

        for (const groupMember of memberList) {
            const userUpdate = await User.findOneAndUpdate({ _id: groupMember },
                {
                    $push: {
                        groups: newGroup._id
                    }
                }, { new: true });
        }

        return res.status(200).json({
            success: true,
            message: "New Group Created Successfully",
            data: groupData,
            notAddedMembers: notAddedMembers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating group",
            error: error.message
        });
    }
}

exports.addMemberConfirmation = async (req, res) => {
    try{
        const { userId, groupId } = req.body;

        // Check if both the group and user exist
        let [group, user] = await Promise.all([
            Group.findById(groupId),
            User.findById(userId)
        ]);

        if (!group || !user) {
            return res.status(400).json({
                success: false,
                message: "Group or user doesn't exist"
            });
        }

        // Check if the user is already a member of the group
        if (group.groupMembers.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User is already a member of the group"
            });
        }

        // Add the user to the group's member list
        group.groupMembers.push(userId);

        group.split[0][userId] = Number(0);
        group.markModified("split");
        user.groups.push(groupId);
        user = await user.save();
        let updatedGroup = await group.save();
        updatedGroup = await updatedGroup.populate("groupMembers");

        return res.status(200).json({
            success: true,
            message: "Member added successfully",
            updatedGroup: updatedGroup
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Error occured while adding member",
            error : error.message
        })
    }
}

exports.updateGroup = async (req, res) => {
    try {
        const { groupId, updatedGroup } = req.body;
        let group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({
                success: false,
                message: "Group does not exist"
            });
        }

        if (req.files && req.files.groupImage) {
            group.groupImage = await imageUpload(req.files.groupImage, process.env.FOLDER_NAME, 1000, 1000);
        }

        Object.assign(group, updatedGroup);
        group = await group.save();

        return res.status(200).json({
            success: true,
            message: "Group updated successfully",
            updatedGroup: group
        });
    } catch (error) {
        console.error("Error updating group:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating group",
            error: error.message
        });
    }
}

exports.viewGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        const group = await Group.findById(groupId).populate("groupMembers");
        if (!group) {
            return res.status(400).json({
                success: false,
                message: "Group not found"
            });
        }

       
        return res.status(200).json({
            success: true,
            message: "Group data fetched successfully",
            group: group,
           
        });
    } catch (error) {
        console.error("Error fetching group data:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching group data",
            error: error.message
        });
    }
}

exports.addMembers = async(req, res) => {
    try{
        const {groupMembers, groupId, userId} = req.body;
        if(!groupMembers || !groupId){
            return res.status(400).json({
                success : false,
                message : "No member is selected or groupid is not given"
            })
        }
        let group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : false,
                message : "Group do not exist"
            })
        }
        
       const userRequested = await User.findById(userId);
       if(!userRequested){
        return res.status(400).json({
            success : false,
            message : "User can not add any memebr"
        })
       }
        const memberList = [];
        const notAddedMembaers = [];

        for(let memberEmail of groupMembers){
            const user = await User.findOne({email : memberEmail});
            if (!user) {
                const confirmationTemplate = confirmationEmail(userRequested.firstName + " " + userRequested.lastName, group.groupName, "http://gmail.com");
                const mail = await mailSender(memberEmail, "Confirmation Email", confirmationTemplate);
                notAddedMembaers.push(memberEmail);
            } else {
                if(!group.groupMembers.includes(user._id)){
                    memberList.push(user._id);
                    group.split[0][user._id] = Number(0);
                    group.groupMembers.push(user._id);
                    user.groups.push(groupId);
                    user = await user.save();
                }
            }
            
        }
        group.markModified("split");
        group = (await group.save()).populate("groupMembers");
        return res.status(200).json({
            success : true,
            message : "Members are added in group",
            group : group,
            membersRemaining : notAddedMembaers
        })
        
    }catch(error){
        console.error("Error While adding Members", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while adding group members",
            error: error.message
        });
    }
}
exports.deleteGroup = async(req, res) => {
    try{
        const {userId, groupId} = req.body;
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : false,
                message : "Group not found"
            })
        }
        if(group.groupOwner!=userId){
            return res.status(400).json({
                success : false,
                message : "Only owner can delete the group"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
       
        for(let member of group.groupMembers){
            let memberUser = await User.findById(member);
            if(!memberUser){
                return res.status(400).json({
                    success : false,
                    message : "Member not found"
                })
            }
            memberUser = await User.findByIdAndUpdate({_id : memberUser._id}, {
                $pull : {groups : groupId}
            }, {new : true});
        }

        const deleteGroup = await Group.findByIdAndDelete(groupId);
        return res.status(200).json({
            success : true,
            message : "Group deleted successfully"
        })
    }catch(error){
        console.error("Error while deleting group", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting group",
            error: error.message
        });
    }
}
exports.addSplit = async (groupId, splitFrom, splitTo, expenseAmount) => {
        console.log("Members list : ", splitTo)  
        expenseAmount = Number(expenseAmount);
        let group = await Group.findById(groupId);
        group.groupTotal += Number(expenseAmount);
        group.split[0][splitFrom] += Number(expenseAmount);
        let expensePerMember = expenseAmount/splitTo.length;
        expensePerMember = Math.round((expensePerMember  + Number.EPSILON) * 100) / 100;
        console.log("Amount per peson : ", expensePerMember);
        for(let member of splitTo){ 
            group.split[0][member] -= expensePerMember;
            console.log("Member Expense : ", group.split[0][member]);
        }
        let balance = 0;
        for(let val of Object.entries(group.split[0])){
            balance += val[1];
        }
        group.split[0][splitFrom] -= Number(balance);
        group.split[0][splitFrom] = Math.round((group.split[0][splitFrom]  + Number.EPSILON) * 100) / 100;
        //console.log("Group Split : ", group.split, group.split[0][splitFrom]);
        group.markModified('split');
        group = await group.save();
        return group;
       
    
}
exports.clearSplit = async (groupId, splitFrom, splitTo, expenseAmount) => {
        let group = await Group.findById(groupId);
        expenseAmount = Number(expenseAmount);
        console.log("Group Total before : ", group.groupTotal);
        group.groupTotal = group.groupTotal - Number(expenseAmount);
        group.split[0][splitFrom] -= Number(expenseAmount);
        
        let expensePerMember = expenseAmount/splitTo.length;
        expensePerMember = Math.round((expensePerMember  + Number.EPSILON) * 100) / 100;
       
        for(let member of splitTo){
            group.split[0][member] += expensePerMember;
        }
        let balance = 0;
        for(let val of Object.entries(group.split[0])){
            balance += val[1];
        }
        group.split[0][splitFrom] -= Number(balance);
        group.split[0][splitFrom] = Math.round((group.split[0][splitFrom]  + Number.EPSILON) * 100) / 100;
        group.markModified('split');
        group = await group.save();
        return group;
    
}
exports.makeSettlement = async(req, res) => {
    try {
        const {groupId, settleFrom, settleTo, settleAmount} = req.body;
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : true,
                message : "Group not foundn !"
            })
        }
        group.split[0][settleFrom] += Number(settleAmount);
        group.split[0][settleTo] -= Number(settleAmount);
        const settleObj = {
            groupId : groupId,
            settleTo : settleTo,
            settleFrom : settleFrom,
            settleDate : new Date(),
            settleAmount : settleAmount
        }
        const settlement = await Settlement.create(settleObj);
        group.markModified('split');
        const groupUpdate = await group.save();

        return res.status(200).json({
            success : true,
            message : "Settlement added",
            group : groupUpdate,
            settlement : settlement
        })
    } catch (error) {
        console.error("Error while adding Split", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while adding Split",
            error: error.message
        });
    }
}
exports.balanceSheet = async(req, res) => {
    try {
        const groupId = req.body.groupId;
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : false,
                message : "Group Not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Balance sheet generated",
            data : simplifyDebts(group.split[0])
        })
        
    } catch (error) {
        console.error("Error while Making BalanceSheet", error);
        return res.status(500).json({
            success: false,
            message: "Error while Making BalanceSheet",
            error: error.message
        });
    }
}