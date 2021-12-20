// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Req, Res } from "../../interface/next";
import connectDB from "../../middlewares/mongodb";

function handler(req: Req, res: Res) {
    res.status(200).json({ name: "John Doe" });
}

export default connectDB(handler);
