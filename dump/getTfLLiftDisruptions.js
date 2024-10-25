import kamran from "../functions/main.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';  
dotenv.config();

const BASE_URL = 'https://api.tfl.gov.uk/Disruptions/Lifts/v2/';
const tflKey = process.env.TFL;
const databaseId = "4e5aeaf3-acb8-4dc5-b208-2c13ce5b26dd";

export async function setData() {
    //Get the timestamp
    const timestampISO = new Date().toISOString();
    const readableTimestamp = new Date(timestampISO).toLocaleString();

    //Set Data Format
    const result = {
        "Bakerloo": [],
        "Central": [],
        "Circle": [],
        "District": [],
        "Hammersmith & City": [],
        "Jubilee": [],
        "Metropolitan": [],
        "Northern": [],
        "Piccadilly": [],
        "Victoria": [],
        "Waterloo & City": [],
        "London Overground": [],
        "Elizabeth line": [],
        "DLR": [],
        "Tram": [],
        "timestampISO": timestampISO
    }

    async function setStation(id, message) {
        //Fetch the station data
        const stationDataResponce = await fetch(`https://api.tfl.gov.uk/StopPoint/${id}`)
        const stationData = await stationDataResponce.json();

        const stationName = stationData.commonName
        
        //Loop Through Lines and Push Station ID to the Result
        for (let line in stationData.lines) {
            let lineName = stationData.lines[line].name
            
            // Check if lineName is a valid line
            if (result.hasOwnProperty(lineName)) {
                
                result[lineName].push({
                    stationId: id,
                    message: message,
                    stationName: stationName
                });
            }
        }
    }

    try {
        //Fetch Data
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        
        //Loop Through Data
        for (let liftDisruption in data) {
            await setStation(data[liftDisruption].stationUniqueId, data[liftDisruption].message)
        }

        const cash = await kamran.database.cash(databaseId, result);   

        let msg = '';
        if(cash.status == true) {
            msg = (`Data Saved to, ${databaseId}, *${readableTimestamp}*`);
        } else {
           msg = (`Error saving data to, ${databaseId}, *${readableTimestamp}*`);
            console.error('Error running periodic task:', cash);
        
        }

        kamran.externalComunicaion.sendWebhookMessage(process.env.D_TFL_LIFT, msg);

    } catch (error) {
        console.error('Error running periodic task:', error);
    }
}

export function getTfLLiftDisruptions() {
    setData(); // Run the task initially
    setInterval(setData, 90 * 1000); // 1 minute 30 seconds in milliseconds
}
