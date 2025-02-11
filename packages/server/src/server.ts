import express from "express";
import "dotenv/config";
import { authRouter } from "./routes/auth.route";
import { urlsRouter } from "./routes/urls.route";
import { dbConnect } from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";

dbConnect();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/urls', urlsRouter);

app.listen(port, () => {
    console.log(`BitUrls app listening on port ${port}`);
})
