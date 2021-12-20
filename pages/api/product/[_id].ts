import { Req, Res } from "../../../interface/next";
import connectDB from "../../../middlewares/mongodb";
import ProductModel from "../../../models/product";

async function handler(req: Req, res: Res) {
    try {
        const value = req.body;
        const data = await ProductModel.create(value);
        res.status(200).json(data);
    } catch (err) {
        res.status(400);
    }
}

export default connectDB(handler);
