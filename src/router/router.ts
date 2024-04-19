import message from "../modules/message/messageRouter";
import user from "../modules/user/userRouter";
import appointment from "../modules/appointment/appointmentRouter";
import Router from "../modules/message/messageRouter";

Router.use('/message',message);
Router.use('/user',user);
Router.use('/appointment',appointment);

export default Router;