
const { ObjectId } = require('mongoose').Types;
const Expense = require("../models/Expense");
const Group = require("../models/Group");
const User = require("../models/User");
const { addSplit, clearSplit } = require("./Group");

exports.addExpense = async (req, res) => {
    try {
        const {expenseName, expenseDescription, groupId, expenseFrom, expenseTo, expenseAmount, expenseType} = req.body;
        console.log(expenseFrom, " ", groupId, " ", expenseTo, "", expenseAmount, " ", expenseDescription)
        if(!expenseFrom || !groupId || !expenseTo || !expenseAmount || !expenseName || !expenseDescription){
            return res.status(400).json({
                success : false,
                message : "All the details is necessary"
            }) 
        }
        if(expenseTo.length==1 && expenseFrom===expenseTo[0]){
            return res.status(400).json({
                success : true,
                message : "You can not add individual expense in the group"
            })
        }
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : false,
                message : "No group exist"
            })
        }
        const owner = await User.findOne({email : expenseFrom});
        if(!owner){
            return res.status(400).json({
                success : false,
                message : "No User exist"
            })
        }
        //console.log("Owner : ", owner);
        let memebrsTo = [];
        if(!group.groupMembers.includes(owner._id)){
            return res.status(400).json({
                success : false,
                message : "No User exist in group"
            })
        }
        if(expenseTo.includes(expenseFrom)){
            memebrsTo.push(owner._id)
        }
       

        for(member of expenseTo){
            if(member!=expenseFrom){
                const memberSplit = await User.findOne({email : member});
                if(!member){
                    return res.status(400).json({
                        success : false,
                        message : "No User exist"
                    })
                }
                if(!group.groupMembers.includes(memberSplit._id)){
                    return res.status(400).json({
                        success : false,
                        message : "No User exist in group"
                    })
                }
                memebrsTo.push(memberSplit._id);
            }
        }
        const expensePerMember = Number(expenseAmount) / memebrsTo.length;

        const expenseObj = {
            groupId : groupId,
            expenseName : expenseName,
            expenseDescription : expenseDescription,
            expenseAmount : expenseAmount,
            expenseCurrency : "INR",
            expenseOwner : owner._id,
            expenseMembers : memebrsTo,
            expensePerMember : expensePerMember,
            createdAt : new Date(),
            expenseType : expenseType
        }
        const expense = await Expense.create(expenseObj);
        console.log("Here");
        const updateGroup = await addSplit(groupId, owner._id, memebrsTo, expenseAmount);
        console.log("Here");
        return res.status(200).json({
            success : true,
            message : "Expense added successfully",
            data : {
                expensen : expense,
                groupUpdate : updateGroup
            }
        })

    } catch (error) {
        console.log("Error occured while adding exense", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while adding expense",
            error : error.message
        })

    }
}
exports.editExpense = async (req, res) => {
    try {
        const {expenseId, expenseName, expenseDescription, groupId, expenseFrom, expenseTo, expenseAmount, expenseType} = req.body;
        if(!expenseId || !expenseFrom || !groupId || !expenseTo || !expenseAmount){
            return res.status(400).json({
                success : false,
                message : "All the details is necessary"
            }) 
        }
        const oldExpense = await Expense.findById(expenseId);
        if(!oldExpense){
            return res.status(400).json({
                success : false,
                message : "No expense exist"
            })
        }
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({
                success : false,
                message : "No group exist"
            })
        }
        const owner = await User.findOne({email : expenseFrom});
        if(!owner){
            return res.status(400).json({
                success : false,
                message : "No User exist"
            })
        }
        let memberTo = [];
        let updateGroup = await clearSplit(groupId, oldExpense.expenseOwner, oldExpense.expenseMembers, oldExpense.expenseAmount);
        console.log("Removed split : ", updateGroup);
        if(!group.groupMembers.includes(owner._id)){
            return res.status(400).json({
                success : false,
                message : "No User exist in group"
            })
        }
        if(expenseTo.includes(expenseFrom)){
            memberTo.push(owner._id);
        }

        for(let member of expenseTo){
            if(member!= expenseFrom){
                const memberSplit = await User.findOne({email : member});
                if(!member){
                    return res.status(400).json({
                        success : false,
                        message : "No User exist"
                    })
                }
                if(!group.groupMembers.includes(memberSplit._id)){
                    return res.status(400).json({
                        success : false,
                        message : "No User exist in group"
                    })
                }
                memberTo.push(memberSplit._id);
            }
        }
        const expensePerMemebr = expenseAmount/expenseTo.length;
        // const expenseObj = {
        //     groupId : groupId,
        //     expenseName : expenseName,
        //     expenseDescription : expenseDescription,
        //     expenseAmount : expenseAmount,
        //     expenseCurrency : "INR",
        //     expenseOwner : expenseFrom,
        //     expenseMembers : expenseTo,
        //     expensePerMember : expensePerMemebr,
        //     createdAt : new Date(),
        //     expenseType : expenseType
        // }
        const newExpense = await Expense.findByIdAndUpdate({_id : expenseId}, {
            $set : {
                groupId : groupId,
                expenseName : expenseName,
                expenseDescription : expenseDescription,
                expenseAmount : expenseAmount,
                expenseCurrency : "INR",
                expenseOwner : owner._id,
                expenseMembers : memberTo,
                expensePerMemebr : expensePerMemebr,
                createdAt : new Date(),
                expenseType : expenseType
            }
        }, {new : true})
        console.log("Members to : ",);
        updateGroup = await addSplit(groupId, owner._id, memberTo, expenseAmount);
        return res.status(200).json({
            success : true,
            message : "Expense added successfully",
            data : {
                expensen : newExpense,
                groupUpdate : updateGroup
            }
        })

    } catch (error) {
        console.log("Error occured while updating  exense", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while updating expense",
            error : error.message
        })
    }
}
exports.deleteExpense = async(req, res) => {
    try {
        const expenseId = req.body.expenseId;
        if(!expenseId){
            return res.status(400).json({
                success : false,
                message : "Expense Id unavailable"
            })
        }
        const expense = await Expense.findById(expenseId);
        if(!expense){
            return res.status(400).json({
                success : false,
                message : "Expense not found"
            })
        }
        await Expense.findByIdAndDelete(expenseId);
        console.log("Expense : ", expense.expenseOwner, expense.expenseMembers); 
        const updatedGroup = await clearSplit(expense.groupId, expense.expenseOwner, expense.expenseMembers, expense.expenseAmount);
        return res.status(200).json({
            success : true,
            message : "Expense deleted",
            data : updatedGroup
        })
    } catch (error) {
        console.log("Error occured while deleting exense", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while deleting expense",
            error : error.message
        })
    }
}
exports.viewExpense = async(req, res) => {
    try {
        const expenseId = req.body.expenseId;
        if(!expenseId){
            return res.status(400).json({
                success : false,
                message : "Expense Id unavalable"
            })
        }
        const expense = await Expense.findById(expenseId).populate("groupId").exec();
        if(!expense){
            return res.status(400).json({
                success : false,
                message : "Expense is unavailable"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Expense data fetched successfully",
            data : expense
        })
    } catch (error) {
        console.log("Error occured while fetching expense data", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching expense data",
            error : error.message
        })
    }
}
exports.viewUserExpenses = async(req, res) => {
    try {
        const userId = req.body.userId;
        
        const expenseData = await Expense.find({"expenseMembers" : userId})
            .sort({"createdAt":-1})
            .populate("groupId")
            .exec();
        if(expenseData.length==0){
            return res.status(400).json({
                success : false,
                message : "Expense data not found"
            })
        }
        let totalAmount = 0;
        for(let expense of expenseData){
            totalAmount += expense.expensePerMember;
        }
        return res.status(200).json({
            success : true,
            message : "Expense data fetched successfully",
            data : {
                expenseData,
                totalAmount}
        })
    } catch (error) {
        console.log("Error occured while fetching recent expense data", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching recent expense data",
            error : error.message
        })
    }
}
exports.viewRecentUserExpenses = async(req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await User.findById(userId);
        if(!userData){
            return res.status(400).json({
                success : false,
                message : "User do not exist. Please sign up again"
            })
        }
        const expenseData = await Expense.find({"expenseMembers" : userId}).sort({"createdAt":-1}).limit(10).populate("groupId").exec();
        if(expenseData.length==0){
            return res.status(400).json({
                success : false,
                message : "Expense data not found"
            })
        }
        let totalAmount = 0;
        for(let expense  of expenseData){
            totalAmount += expense.expensePerMember;
        }
        return res.status(200).json({
            success : true,
            message : "Expense data fetched successfully",
            data : {
                expenseData,
                totalAmount}
        })
    } catch (error) {
        console.log("Error occured while fetching recent expense data", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching recent expense data",
            error : error.message
        })
    }
}
exports.viewUserMonthlyExpense = async(req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await User.findById(userId);
        const userIdObj = new ObjectId(userId);
        if(!userData){
            return res.status(400).json({
                success : false,
                message : "User do not exist. Please sign up again"
            })
        }
        const expenseData = await Expense.aggregate([{
            $match : {
                expenseMembers : userIdObj
            }
        },{
            $group :  {
                _id : {
                    month : {
                        $month  : "$createdAt"
                    },
                    year : {
                        $year : "$createdAt"
                    }
                }, 
                totalExpense : {
                    $sum : "$expensePerMember"
                }
            }
        }, {
            $sort : {"_id.month" : 1}
        }])

        if(expenseData.length==0){
            return res.status(400).json({
                success : false,
                message : "Expense data not found"
            })
        }
       
        return res.status(200).json({
            success : true,
            message : "Expense data fetched successfully",
            data : {
                expenseData
            }
        })
    } catch (error) {
        console.log("Error occured while fetching Monthly expense data", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching Monthly expense data",
            error : error.message
        })
    }
}
exports.viewUserDailyExpense = async(req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await User.findById(userId);
        const objectUserId = new ObjectId(userId);
        if(!userData){
            return res.status(400).json({
                success : false,
                message : "User do not exist. Please sign up again"
            })
        }
        const expenseData = await Expense.aggregate([{
            $match : {
                expenseMembers : objectUserId,
                createdAt : {
                    $gte : new Date(new Date().setMonth(new Date().getMonth()-1)),
                    $lt : new Date()
                }
            }
        }, {
            $group : {
                _id : {
                    date : {
                        $dayOfMonth : "$createdAt"
                    },
                    month : {
                        $month : "$createdAt"
                    },
                    year : {
                        $year : "$createdAt"
                    }
                },
                expenseAmount : {
                    $sum : "$expensePerMember"
                }
            }
        }])
        if(expenseData.length==0){
            return res.status(400).json({
                success : false,
                message : "Expense data not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Expense data fetched successfully",
            data : {
                expenseData,
            }
        })
    } catch (error) {
        console.log("Error occured while fetching Monthly expense data", error);
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching Monthly expense data",
            error : error.message
        })
    }
}