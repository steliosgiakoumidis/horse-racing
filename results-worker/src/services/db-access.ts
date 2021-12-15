import { IRaceInfo } from '../types/raceInfo.interface';
import RaceInfo from '../models';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGO_CONNECTIONSTRING as string;

const initiateDbConnection = async (): Promise<void> => {
    await mongoose.connect(uri);
    console.error("db connection initialized")
}

const storeEntry = async (entry: IRaceInfo): Promise<void> => {
    try {
        var dbEntry: IRaceInfo = new RaceInfo(entry)
        await RaceInfo.create(dbEntry);
        console.info("Entry persisted successfully");
    } catch (error) {
        console.error("Write to db failed. Error: " + error);
    }
}

export {storeEntry, initiateDbConnection}