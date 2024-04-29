const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "group"
    },
    expenseName: {
        type: String,
        required: true
    },
    expenseDescription: {
        type: String,
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseCurrency:{
        type: String,
        default: "INR"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    expenseOwner: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user"
    },
    expenseMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    expensePerMember: {
        type: Number,
        required: true
    },
    expenseType: {
        type: String, 
        default: "Cash"
    },
    
},
);
module.exports = mongoose.model("expense",expenseSchema);