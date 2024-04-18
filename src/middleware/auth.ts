import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/user/userModel";

export const isAdminAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
    try{
        const token = req.cookies.adminToken;
  if (!token) {
    return res.status(400).send("Admin not authenticated");
  }
  const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  req.user = await User.findByPk(decoded.id);
  if (req.user.role !== "Admin") {
    return res
      .status(400)
      .send(`${req.user.role} not authorized from this resources`);
  }
  next();
    }
  catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error")
  }
};

export const isPatientAuthenticated = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try{
        const token = req.cookies.patientToken;
    if (!token) {
      return res.status(400).send("Patient not authenticated");
    }
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = await User.findByPk(decoded.id);
    if (req.user.role !== "Patient") {
      return res
        .status(400)
        .send(`${req.user.role} not authorized from this resources`);
    }
    next();
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
  };