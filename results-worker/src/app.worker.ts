import axios, { AxiosError, AxiosResponse, } from 'axios';
import request from "axios";
import { IRaceInfo } from './types/raceInfo.interface';
import dotenv from 'dotenv';
import {initiateDbConnection, storeEntry} from './services/db-access';

dotenv.config();

const uri: string = process.env.MONGO_CONNECTIONSTRING as string;

const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

const authenticate = async (): Promise<string> => {
    var data = {
        'email': 'stelios.giakoumidis@gmail.com',
        'password': process.env.AUTH_PASSWORD as string
    };

    const result: AxiosResponse = await axios.post(`${process.env.BASE_URL}/auth`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.data.token;
}


const worker = async (): Promise<void> =>{
    let authToken = "";
    try {
        authToken = await authenticate();
    } catch (error) {
        console.error(error)
    }

    const authHeaderValue = `Bearer ${authToken}`;
    
    while (true) {
        try { 
            const getResult: AxiosResponse = await axios.get(`h${process.env.BASE_URL}/results`, 
                 { headers: { Authorization: authHeaderValue }}
            ) 

            if (getResult.status === 204){
                console.warn("Server responded with status 204");
                continue;
            }

            const raceInfo = {
                event: getResult.data.event,
                time: getResult.data.time,
                horseId: getResult.data.horse.id,
                horseName: getResult.data.horse.name,
                } as IRaceInfo;

            await storeEntry(raceInfo);
         } catch (error) {
             if(request.isAxiosError(error)){
                let statusCode = error.response?.status
                 console.error("Error message: " + error.message + ". Error Status code: " + statusCode)
  
                 if(statusCode === 401){
                     console.warn("Error handling for 401 initiated")
                     authToken = await authenticate();
                 }
 
                 if(statusCode === 503){
                     console.warn("Error handling for 503 initiated. 5 sec will be awaited")
                     await sleep(5000);
                 }
             }

             console.error("An non Axios error occured. Error: " + error) 
         }

         await sleep(1000);
    }
}

try {
    initiateDbConnection().then(() => {
             worker();
    });
} catch (error) {
    console.error("Error: " + error)
}
