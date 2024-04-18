import User from "./userModel";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import path from 'path';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            nic,
            role,
          } = req.body;
          if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !password ||
            !gender ||
            !dob ||
            !nic ||
            !role
          ) {
            return res.status(400).send("All fields required");
          }
          const exist = await User.findOne({
            where: {
              email: email,
            },
          });
          if (exist) {
            return res.status(400).send("User already registered");
          }
          await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phone,
            password: password,
            gender: gender,
            dob: dob,
            nic: nic,
            role: role,
          });
          res.status(200).send("User registered");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
  
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return res.status(400).send("All fields required");
  }
  if (password !== confirmPassword) {
    return res.status(400).send("Password and Confirm password do not match!");
  }
  const user: any = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).send("Invalid password or email ");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  console.log(password, isPasswordMatched);
  if (!isPasswordMatched) {
    return res.status(400).send("Password is not correct");
  }
  if (role !== user.role) {
    return res.status(400).send("User with this role not found");
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: process.env.JWT_EXPIRES as string }
  );

  const cookieExpires = parseInt(process.env.COOKIE_EXPIRES as string) || 7; // Default to 7 days if COOKIE_EXPIRES is not set or invalid

  if (role === "Patient") {
    res.cookie("patientToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
    });
  } else if (role === "Admin") {
    res.cookie("adminToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
    });
  }
  res.status(200).send("User logged in successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
};

export const addNewAdmin = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return res.status(400).send("All fields required");
  }
  const isRegistered: any = await User.findOne({
    where: {
      email: email,
    },
  });
  if (isRegistered) {
    return res.status(400).send(`${isRegistered.role} with this id exists!`);
  }
  const admin = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phone,
    password: password,
    gender: gender,
    dob: dob,
    nic: nic,
    role: "Admin",
  });
  res.status(200).send("New Admin registered");
    }
  catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllDoctors = async(req:Request,res:Response,next:NextFunction)=>{
    const doctors = await User.findAll({
        where:{
            role:"Doctor"
        }
    });
    res.status(200).send(doctors);
};

export const getUserDetails = async(req:Request,res:Response,next:NextFunction)=>{
    const user = (req as any).user;
    res.status(200).send(user);
}

export const logoutAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    res.cookie('adminToken', '', { expires: new Date(0), httpOnly: true });
    res.status(200).send("User Logged Out Successfully");
}

export const logoutUser = async(req:Request,res:Response,next:NextFunction)=>{
    res.cookie('patientToken', '', { expires: new Date(0), httpOnly: true });
    res.status(200).send("User Logged Out Successfully");
}

export const addNewDoctor = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.docAvatar) {
        return res.status(400).send("Doctor Avatar Required");
    }

    const { docAvatar }: any = req.files;
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const fileExtension = path.extname(docAvatar.name).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).send("File format not supported");
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment) {
        return res.status(400).send("Provide full details");
    }

    const isRegistered: any = await User.findOne({
        where: {
            email: email
        }
    });

    if (isRegistered) {
        return res.status(400).send(`${isRegistered.role} already registered`);
    }

    try {
        // Upload doctor avatar to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse && cloudinaryResponse.error ? cloudinaryResponse.error : "Unknown Cloudinary Error");
            return res.status(500).send("Error uploading image to Cloudinary");
        }

        // Create new doctor record
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phone,
            password: password,
            gender: gender,
            dob: dob,
            nic: nic,
            role: "Doctor",
            doctorDepartment: doctorDepartment,
            docAvatar: {
                _id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            }
        });

        res.status(200).send("New Doctor registered");
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).send("Internal Server Error");
    }
}
