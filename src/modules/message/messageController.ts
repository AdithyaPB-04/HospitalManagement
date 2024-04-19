import { Message } from "./messageModel";
import { NextFunction, Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email, phone, message } = req.body;
        if (!firstName || !lastName || !email || !phone || !message)
          {return res.status(400).send("All fields required");}
        await Message.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phone,
          message: message
        });
        res.status(200).send('Message send successfully')
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
};

export const getAllMessages = async(req:Request,res:Response,next:NextFunction)=>{
  const messages = await Message.findAll();
  res.status(200).send({
    messages
  });
}