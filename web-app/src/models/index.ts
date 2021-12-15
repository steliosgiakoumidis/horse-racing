import { IRaceInfo } from '../types/raceInfo.interface';
import { model, Schema } from 'mongoose';

const raceInfoSchema: Schema = new Schema(
    { 
        event: {
        type: String,
        required: true,
        },
        horseId:{
            type: Number,
            required: true,
        },
        horseName:{
            type: String,
            required: true,
        },
        time:{
            type: Number,
            required: true,
        }
    },
        { timestamps: true},
    
);

export default model<IRaceInfo>("RaceInfo", raceInfoSchema);