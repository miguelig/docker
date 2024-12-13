import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Demasiadas solicitudes de esta IP, inténtelo de nuevo más tarde.', 
    headers: true, 
});

app.use(session({
    secret: process.env.SECRET_KEY , // Clave secreta para firmar la cookie de sesión
    resave: false, // Evita volver a guardar la sesión si no ha sido modificada
    saveUninitialized: false, // No guarda sesiones vacías
}));

app.use(limiter);
app.use('/api', router ,limiter, session);

app.listen(port, () => {
    console.log(`El servidor es ejecutado en puerto: http://localhost:${port}`);
});
