import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userrooutes from './routes/user.routes.js';




const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:8000",
        credentials: true,
    })
);


app.use(cookieParser());// Cookie parsing middleware

app.use((req, res, next) => {
    console.log("Cookies received:", req.cookies);
    next();
});



app.get('/', (req, res) => {
    res.send('Hello World');
}
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/users', userrooutes);







export {app}