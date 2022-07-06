import UserModel from "../models/user.js";

    export const userRegistration=async (req, res, next) => {
        const { username, email, password ,refferal_code} = req.body;
        const user = await UserModel.find({ email: email })
        if (user.length>0) {
            res.send({ "status": "failed", "message": "email already exist" })
        } else {
            if (username && email && password && !refferal_code) {
                const usermodel = new UserModel(req.body);
                const result = await usermodel.save();
                res.send(result)
            }
            if (username && email && password && refferal_code) {
                let parentUser=await UserModel.findOne({refferal_code:refferal_code})
                if(parentUser){
                    await UserModel.updateOne({refferal_code:refferal_code},{$set:{"refferal_bonus":50}})
                }
               if(!parentUser){
                res.send({message:"Invalid reffrel code"})
               }
                const usermodel =await new UserModel({
                    username:username,
                    email:email,
                    password:password,
                    refferal_code:refferal_code, 
                    children_user:true
                });
                const result = await usermodel.save();
                res.send(result)
            }
             
        }
    }
    
    export const getAllUsers=async(req,res,next) => {
        try {
            const results = await UserModel.find();
            // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
            // const results = await Product.find({ price: 699 }, {});
            res.send(results);
          } catch (error) {
            console.log(error.message);
          }
    }
    
    export const findUsersById=async (req, res, next) => {
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


