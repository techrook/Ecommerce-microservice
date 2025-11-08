export const configuration = () => ({
    APP_PORT:parseInt(process.env.PORT ?? '3001', 10),
    APP_SESSION_SECRET:process.env.SESSION_SECRET,
    DATABASE:{
        HOST: process.env.DB_HOST,
        PORT:parseInt(process.env.DB_PORT ?? '5432', 10),
        USER:process.env.DB_USER,
        PASSWORD:process.env.DB_PASSWORD,
        NAME:process.env.DB_NAME,
    }
})