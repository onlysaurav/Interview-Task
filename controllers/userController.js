import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
export const userRegistration = async (req, res, next) => {
  const { username, email, password, refferal_code } = req.body;
  const user = await UserModel.find({ email: email })
  if (user.length > 0) {
    res.send({ "status": "failed", "message": "email already exist" })
  } else {
    if (username && email && password && !refferal_code) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const updateDoc = new UserModel({
        username: username,
        email: email,
        password: hashPassword
      });
      const result1 = await updateDoc.save();
      const usermodel = new UserModel(result1);
      const result = await usermodel.save();
      res.send(result)
    }
    if (username && email && password && refferal_code) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const updateDoc = new UserModel({
        username: username,
        email: email,
        password: hashPassword,
        refferal_code: refferal_code
      });
      const result1 = await updateDoc.save();
      console.log("===hash", hashPassword)
      const usermodel1 = new UserModel(result1);
      const result2 = await usermodel1.save();
      let parentUser = await UserModel.findOne({ refferal_code: refferal_code })
      if (parentUser) {
        await UserModel.updateOne({ refferal_code: refferal_code }, { $inc: { refferal_bonus: 50 } })
        await UserModel.updateOne({ refferal_code: refferal_code }, { $inc: { total_children: 1 } })
      }
      if (!parentUser) {
        res.send({ message: "Invalid reffrel code" })
      }
      const usermodel = await new UserModel({
        username: username,
        email: email,
        password: hashPassword,
        refferal_code: refferal_code,
        children_user: true
      });
      const result = await usermodel.save();
      res.send(result)
    }

  }
}
export const getAllUsers = async (req, res, next) => {
  try {
    const results = await UserModel.find();
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
}
export const findUsersById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    // const product = await Product.findOne({ _id: id });
    if (!user) {
      throw createError(404, 'User does not exist.');
    }
    res.send(user);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(error);
  }
}


