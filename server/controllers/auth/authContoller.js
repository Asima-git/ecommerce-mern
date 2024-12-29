const dotenv = require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

//register
const registerUser = async(req,res)=>{
 const {name,email,password} = req.body;
 try {
    const checkUser = await User.findOne({email});
    if(checkUser){
        return res.json({success:false,message:"User Already register please try again"});
    }
    const hashPassword = await bcrypt.hash(password,12);
    const newUser = new User({
        name,email,password:hashPassword
    })
    await newUser.save();
    res.status(200).json({
        success:true,
        message:"Registration Successfull"
    })
    
 } catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Some error occured"
    })
 }
}
//login
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.json({success:false,message:"User Doesn't Exist please register first"});
        }
        const checkPassword = bcrypt.compare(password,checkUser.password);
        if(!checkPassword){
            return res.json({success:false,message:"Invalid cradetials please try again"});
        }
        const token = jwt.sign({
            id:checkUser._id,
            role:checkUser.role,
            email:checkUser.email,
            name:checkUser.name
        },process.env.CLIENT_SECRET_KEY,{expiresIn:"60m"})
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
              email: checkUser.email,
              role: checkUser.role,
              id: checkUser._id,
              name: checkUser.name,
            },
          });
    } catch (error) {
       console.log(error);
       res.status(500).json({
           success:false,
           message:"Some error occured"
       })
    }
   }

//logout
const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'Strict',
        path: '/' // Ensure path matches where cookie was set
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

//auth middleware
const authMiddelware = async(req,res,next) =>{
 const token = req.cookies.token;
 if(!token){
    return res.status(401).json({
        success:false,
        message:"Unauthorised User"
    })
 }
 try {
    const decoded = jwt.verify(token,process.env.CLIENT_SECRET_KEY);
    req.user = decoded
    next()
 } catch (error) {
    res.status(401).json({
        success:false,
        message:"Unauthorised User",
        error:error
    })
 }
}

module.exports = {registerUser,loginUser,logoutUser,authMiddelware}