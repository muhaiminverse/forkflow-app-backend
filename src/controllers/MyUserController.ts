// // my code

// import { type Request, type Response } from "express";
// import User = require("../models/user");


// // ----------------
// // GET USER  
// // ----------------
// const getCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const currentUser = await User.findOne({ _id: req.userId });
//     if (!currentUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // ----------------
// // UPDATE USER  
// // ----------------
// const updateCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const { name, addressLine1, country, city } = req.body;
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.name = name;
//     user.addressLine1 = addressLine1;
//     user.city = city;
//     user.country = country;

//     await user.save();

//     res.send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error updating user" });
//   }
// };

// // ----------------
// // CREATE USER  
// // ----------------
// const createCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const { auth0Id } = req.body;
//     const existingUser = await User.findOne({ auth0Id });

//     if (existingUser) {
//       return res.status(200).send();
//     }

//     const newUser = new User(req.body);
//     await newUser.save();

//     res.status(201).json(newUser.toObject());
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error creating user" });
//   }
// };

// export = {
//   createCurrentUser,
//   updateCurrentUser,
//   getCurrentUser,
// };





// gpt fix




import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const auth0Id = req.body.auth0Id || req.auth0Id;
    const email = req.body.email || req.email;

    if (!auth0Id || !email) {
      return res.status(400).json({ message: "auth0Id and email are required" });
    }

    let existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      if (existingUser.email !== email) {
        existingUser.email = email;
        await existingUser.save();
      }
      return res.status(200).json(existingUser.toObject());
    }

    const newUser = await User.create({
      auth0Id,
      email,
      name: req.body.name || "",
    });

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
