import { createServer } from "http";
import AppDataSource from "./config/data-source";
import app from "./server";  
import "reflect-metadata";
import { initializeSocket } from "./socket";

require('dotenv').config();

const httpServer = createServer(app);  
const io = initializeSocket(httpServer);

AppDataSource.initialize().then(() => {
    console.log("Conexión a la base de datos realizada con éxito!");
    
    httpServer.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
}).catch((error: any) => console.log(error));

export { io };