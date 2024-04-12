const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log("Database Connection Successfull");
    })
    .catch((err) => {
        console.log("Error occured during database connection");
        console.error(err);
        process.exit(1);
    })
}