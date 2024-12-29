const express = require('express');
const {registerUser,loginUser,logoutUser,authMiddelware} = require('../../controllers/auth/authContoller')
const router = express.Router();
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/check-auth',authMiddelware,(req,res)=>{
     const user = req.user;
     res.status(200).json({
        success:true,
        message:"User is authenticated",
        user,
     })
})

module.exports = router;