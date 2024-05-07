const express = require("express")
const router = express.Router()
const { auth} = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  changePassword
} = require("../controllers/Profile")

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getUserDetails", auth, getAllUserDetails)
router.post("/changepassword", auth, changePassword)

module.exports = router