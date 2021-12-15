import { Request, Response } from 'express';
import { IRaceInfo } from '../types/raceInfo.interface';
import RaceInfo from '../models'

const getEntries = async (req: Request, res: Response): Promise<void> => {
    try {
        let page: number = parseInt(req.query.page as string);
        let limit: number = parseInt(req.query.limit as string);
        const entries: IRaceInfo[] = await RaceInfo.find().limit(limit).skip(limit*page).sort('-createdAt');
        res.status(200).json({entries});
    } catch (error) {
        res.status(500).send();
    }
}

const addEntry = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("start");

        const parsedRequestBody: IRaceInfo = req.body;
        console.info("Rquest body: " + parsedRequestBody)

        if(!parsedRequestBody) {
            res.status(400).send("No request object")
        }

        const raceInfo: IRaceInfo = new RaceInfo({
            ...parsedRequestBody
        })
        const storedEntry: IRaceInfo = await RaceInfo.create(raceInfo);

        res.status(201).json(storedEntry)
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).send(error);
    }
}

export {getEntries, addEntry};