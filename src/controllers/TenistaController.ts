import { Request, Response } from "express";
import { IdParam } from "../models/IdParam";

const findById = async (req: Request<IdParam>, res: Response) => {
    const { id } = req.params;
    return res.json({id, nome: 'Nome do Tenista ' + id});
}

export default {
    findById
}