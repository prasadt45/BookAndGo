import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userrooutes from './routes/user.routes.js';




const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
}
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/users', userrooutes);







export {app}