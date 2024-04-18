import { registerUser,login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutUser, addNewDoctor } from './userController';
import { isAdminAuthenticated,isPatientAuthenticated } from '../../middleware/auth';
import Router from 'express';

const router = Router();

router.post('/register',registerUser);
router.get('/login',login);
router.post('/admin',isAdminAuthenticated,addNewAdmin);
router.get('/all',getAllDoctors);
router.get('/admin/me',isAdminAuthenticated,getUserDetails);
router.get('/patient/me',isPatientAuthenticated,getUserDetails);
router.get('/admin/logout',isAdminAuthenticated,logoutAdmin);
router.get('/patient/logout',isPatientAuthenticated,logoutUser);
router.post('/doctor/addnew',isAdminAuthenticated,addNewDoctor);

export default router;