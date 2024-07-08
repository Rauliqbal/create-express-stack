import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
   const { username, email, password, role } = req.body;
   try {
      const newUser = new User({
         username,
         email,
         password,
         role,
      });

      const saveUser = await newUser.save();
      res.status(201).json({
         status: "Success",
         message: "User registered succesfully!",
         data: saveUser,
      });
   } catch (error) {
      res
         .status(204)
         .json({ status: "Failed", message: `Error: ${error.message}` });
   }
};

export const login = async (req, res) => {

   try {
      // check email
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(404).json({ message: "Email not found!" })

      // check password
      const passwordValid = await bcrypt.compare(req.body.password, user.password)
      if (!passwordValid) return res.status(404).json({ mesage: "Password not found!" })

      // create token

   } catch (error) {
      res.status(400).json({ status: "Failed", message: `Error : ${error.message}` })
   }
};
