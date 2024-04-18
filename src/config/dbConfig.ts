const config={
    USER:"root",
    HOST:"localhost",
    PASSWORD:"adithya@04",
    dialect:"mysql",
    DB:"hospital",
    pool:{
        min:0,
        max:5,
        acquire:30000,
        idle:10000
    }
}
export default config;

