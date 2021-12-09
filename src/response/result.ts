import { Response } from "express"

export interface IResult {
    ok: boolean;
    data: any;
    message: string;
}

export const result = (res: Response,data: any, ok: boolean = true): Response<IResult> => {
    return res.json({
        ok,
        data,
    });
}