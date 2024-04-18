import message from "../modules/message/messageRouter";
import user from "../modules/user/userRouter";
import Router from "../modules/message/messageRouter";

Router.use('/message',message);
Router.use('/user',user);

export default Router;