import { adminModel } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { managerModel } from "../models/mangerModel.js";
import jwt from "jsonwebtoken";

// ============================================ Signup Manager ============================================
export const signup = async (req, res) => {
  const { username, name, email, password, confirm_password } = req.body;
  try {
    if (!password == confirm_password) {
      res.json({ status: false, message: "Password and Confirm must be same" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await managerModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
    });

    res.json({ status: true, message: "Manger Sign up Successfully..." });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// ============================================ Signin admin ============================================

export const signinAdmin = async( req,res)=> {
    const { email, password, confirm_password } = req.body;
    try {
         const admin = await adminModel.find({ email });

        if(!admin)
        {
            res.json({status:false,message:"Admin  Not found!"})
        }

        const matchedPassword = await bcrypt.compare(password, admin.password);

      if (!matchedPassword) {
        res.json({
          status: false,
          message: "Password is invalid cendencial !",
        });
      }

      const token = jwt.sign({ admin }, "JwtProjects28/02/2026", {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token);

      res.json({statu:true,message:"Admin Sigin Successfully..."})
    }
 catch (error) {
        res.json({ status: false, message: error.message });
    }
}

// ============================================ Signin manager ============================================

export const signinManager = async( req,res)=> {
    const { email, password, confirm_password } = req.body;
    try {
         const manager = await managerModel.find({ email });

        if(!manager)
        {
            res.json({status:false,message:"Manager Not found!"})
        }
        
        const matchedPassword = await bcrypt.compare(password, admin.password);

      if (!matchedPassword) {
        res.json({
          status: false,
          message: "Password is invalid cendencial !",
        });
      }

      const token = jwt.sign({ admin }, "JwtProjects28/02/2026", {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token);

      res.json({statu:true,message:"Manager Sigin Successfully..."})
    }
 catch (error) {
        res.json({ status: false, message: error.message });
    }
}

// ============================================ Signin both admin and manager ============================================
// export const signin = async (req, res) => {

//   const { email, password, confirm_password } = req.body;
//   try {
//     if (!(password == confirm_password)) {
//       res.json({ status: false, message: "Password and Confirm must be same" });
//     }

//     const admin = await adminModel.find({ email });
//     const manager = await managerModel.find({ email });

//     if (admin) {
//       const matchedPassword = await bcrypt.compare(password, admin.password);

//       if (!matchedPassword) {
//         res.json({
//           status: false,
//           message: "Password is invalid cendencial !",
//         });
//       }

//       const token = jwt.sign({ admin }, "JwtProjects28/02/2026", {
//         expiresIn: "1d",
//       });

//       res.cookie("auth_token", token);
//     }
//     if (manager) {
//       const matchedPassword = await bcrypt.compare(password, manager.password);

//       if (!matchedPassword) {
//         res.json({
//           status: false,
//           message: "Password is invalid cendencial !",
//         });
//       }

//       const token = jwt.sign({ manager }, "JwtProjects28/02/2026", {
//         expiresIn: "1d",
//       });

//       res.cookie("auth_token", token, {
//         maxAge: 1 * 60 * 60 * 24,
//       });
//     }
//   } catch (error) {
//     res.json({ status: false, message: error.message });
//   }
// };

// ============================================ Add Manager ============================================

export const addManagerDataAdmin = async (req, res) => {
  const {
    name,
    email,
    salary,
    designation,
    status,
    username,
    password,
    confirm_password,
  } = req.body;
  try {
    if (!password == confirm_password) {
      res.json({ status: false, message: "Password and Confirm must be same" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await managerModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
      salary,
      designation,
      status,
    });

    res.json({ status: true, message: "Manger Sign up Successfully..." });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// ============================================ update Manager ============================================

export const updateManagerDataAdmin = async (req, res) => {
  const { name, email, salary, designation, status } = req.body;
  try {
    const token = res.cookie.auth_token;
    let decoed = jwt.verify(token, "JwtProjects28/02/2026");

    if (decoed.username == "Admin") {
      await managerModel.updateOne(
        { email },
        {
          $set: {
            name,
            email,
            salary,
            designation,
            status,
          },
        },
      );

      res.json({
        status: true,
        message: "Manager Infomation are Updated Successfully...",
      });
    } else {
      res.json({ status: false, message: "Unauthorized Admin !" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// ============================================ Get All Manager ============================================

export const getAllManager = async (req, res) => {
  try {
    const result = await managerModel.find();

    res.json({
      status: true,
      message: "Manager Fetched Successfully...",
      result,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// ============================================ Delete single Manager ============================================

export const deleteManager = async(req,res)=>{
    const {id} = req.params._id
    try {
        await managerModel.deleteOne({id})
        res.json({status:true,message:"Manager Deleted Successfully..."})
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}