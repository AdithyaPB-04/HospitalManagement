import { deleteAppointment, getAllAppointments, postAppointment,updateAppointmentStatus } from "./appointmentController";
import { Router } from "express";
import { isAdminAuthenticated, isPatientAuthenticated } from "../../middleware/auth";

const router = Router();

router.post('/patientappointment',isPatientAuthenticated,postAppointment);
router.get('/allAppointments',isAdminAuthenticated,getAllAppointments);
router.put('/status/:id',isAdminAuthenticated,updateAppointmentStatus);
router.delete('/delete/:id',isAdminAuthenticated,deleteAppointment);

export default router;