import { NextApiRequest, NextApiResponse } from "next";
import { UserInterface } from ".";
export interface Req extends NextApiRequest {
    user?: UserInterface;
}
export interface Res extends NextApiResponse {}
