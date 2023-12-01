import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from 'cors';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";
import session from 'express-session';

// user routes for accessing user data
import UserRoutes from "./users/routes.js";

// connecting to mongodb
import mongoose from 'mongoose';
mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");

const app = express();
app.use(express.json());

// configure cors for multiple sessions
app.use(cors({
    // origin: "http://localhost:3000",
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// configure app for session use
const sessionOptions = {
    secret: "Orijit",
    resave: false,
    saveUninitialized: false
};

// for production environment
if(process.env.NODE_ENV !== 'DEVELOPMENT') {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        secure: true,
        sameSite: 'none'
    };
}

// use session
app.use(session(sessionOptions));

Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

// app.listen(4000);
app.listen(process.env.PORT || 4000);