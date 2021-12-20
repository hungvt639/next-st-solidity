import mongoose from "mongoose";
import { MONGO_DB } from "../config/const";
import { Req, Res } from "../interface/next";
const connectDB = (handler: any) => async (req: Req, res: Res) => {
    if (mongoose.connections[0].readyState) {
        console.log("DB is connected");
        return handler(req, res);
    }
    try {
        await mongoose.connect(MONGO_DB);
        console.log("Connect OK");
    } catch (e) {
        console.log("Connect NOT OK");
    }
    return handler(req, res);
};

export default connectDB;
