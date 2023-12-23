const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const User = require("../model/userModel")

const register = async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        res.status(400).json({ status:false,msg:"Please Enter Email / Password / User Name"});
      }
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        res.status(400).json({ status:false,msg:"User Already Exist"});
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        username,
        email,
        password: hashedPassword
      });
      await user.save();
      res.status(200).json({ status:true,msg:"Register Successfully..."});
    } catch (error) {
      res.status(400).json({ status:false,msg:"Something Went wrong..."});
    }
  };
  
const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ status:false,msg:"Please Enter Email / Password"});
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ status:false,msg:"User Not Found"});
      }
      const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ status:false,msg:"Incorrect Password"});
      }
      const token = jwt.sign({ id: user._id }, "sEcKrEt", {
        expiresIn: "9 years"
      });
      res.status(200).json({ status:true,token:token });
    } catch (error) {
      res.status(400).json({ status:false,msg:"Something Went Wrong"});
    }
  };


  module.exports = {
    register,login
  }

  