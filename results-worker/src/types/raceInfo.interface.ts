import {Document} from 'mongoose';

export interface IRaceInfo extends Document{
    event: string,
    time: number,
    horseId: number,
    horseName: string
}