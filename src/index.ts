import config from "./config/dbConfig";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect as any,
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated");
})
.catch((error)=>{
    console.log("Not authenticated");
    console.log(error);
})

// sequelize.sync({alter:true})
// .then(()=>{
//     console.log("Sync-done");
// })
// .catch((error)=>{
//     console.log("Sync-not done");
//     console.log(error);
// })

export default sequelize;