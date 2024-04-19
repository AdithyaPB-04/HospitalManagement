import { Appointment } from "./appointmentModel";
import { Request,Response,NextFunction } from "express";
import User from "../user/userModel";

export const postAppointment = async(req:Request,res:Response,next:NextFunction)=>{
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address
       } = req.body;
       if(!firstName||
        !lastName||
        !email||
        !phoneNumber||
        !nic||
        !dob||
        !gender||
        !appointment_date||
        !department||
        !doctor_firstName||
        !doctor_lastName||
        !address){
            return res.status(400).send("All fields required");
        }
        const isConflict:User[] = await User.findAll({
            where:{
                firstName:doctor_firstName,
                lastName:doctor_lastName,
                role:"Doctor",
                doctorDepartment:department
            }
        }) 
        if(isConflict.length===0){
            return res.status(400).send("Doctor not found");
        }
        if(isConflict.length>1){
            return res.status(400).send("Doctor Conflict Please Contact through email or phone");
        }
        const doctorId = isConflict[0].id;
        const patientId = req.user.id;
        const appointment = await Appointment.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber,
            nic:nic,
            dob:dob,
            gender:gender,
            appointment_date:appointment_date,
            department:department,
            doctorId:doctorId,
            patientId:patientId,
            doctor:{
                firstName:doctor_firstName,
                lastName:doctor_lastName,
            },
            hasVisited:hasVisited,
            address:address
        });
        res.status(200).send({"Appointment Sent Successfully!":appointment});
}

export const getAllAppointments = async(req:Request,res:Response,next:NextFunction)=>{
    const appointments = await Appointment.findAll();
    res.status(200).send(appointments);
}

export const updateAppointmentStatus = async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    const {status} = req.body;
    let appointment:any = await Appointment.findByPk(id);
    if(!appointment){
        return res.status(400).send("Appointment not found");
    }
    appointment.status = status;
    appointment.save();
    res.status(200).send({"Appointment status updated Successfully":appointment})
}

export const deleteAppointment = async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    let appointment = await Appointment.findByPk(id);
    if(!appointment){
        return res.status(400).send("Appointment not found");
    }
    await appointment.destroy();
    res.status(200).send("Appointment deleted!");
}