
const express = require('express');
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/User");
const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const groupRoute = require("./routes/group");
const expenseRoutes = require("./routes/expense");
const contactRoute = require("./routes/contact");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

database.dbConnection();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    })
)

app.use(cors({
    origin:"*",
    credentials: true 
}));

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/group", groupRoute);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/reach", contactRoute);

app.listen(PORT, ()=>{
    console.log("App is listening on port number ", PORT);
});
app.get('/', (req, res)=>{
    res.sendStatus(200);
})