
const express = require('express');
const cors = require("cors");
const app = express();
const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require('cookie-parser');


require("dotenv").config();
const PORT = process.env.PORT || 3000;

database.dbConnection();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "*",
    credentials: true 
}));

app.listen(PORT, ()=>{
    console.log("App is listening on port number ", PORT);
});
app.get('/', (req, res)=>{
    res.sendStatus(200);
})