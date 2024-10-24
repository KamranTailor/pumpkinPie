import kamran from "../functions/main.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';  
dotenv.config();

const TFL_API_BASE_URL = 'https://api.tfl.gov.uk/line/mode/';
const tflKey = process.env.TFL;
const databaseId = "7750a3bc-1372-4485-9581-8516193b3f6e";

export async function setData() {
    function compairData(oldData, newData) {
        delete oldData[0].timestampISO;
        delete newData[0].timestampISO;

        for (let mode in newData[0]) {
            for (let line in newData[0][mode]) {
                let lineName = newData[0][mode][line].name;
                let oldStatusCode = oldData[0][mode][line].lineStatuses[0].statusSeverity;
                let newStatusCode = newData[0][mode][line].lineStatuses[0].statusSeverity;

                if (oldStatusCode != newStatusCode) {
                    console.log(`Line ${lineName} has changed status from ${oldStatusCode} to ${newStatusCode}`);
                }
            }
        }
    }

    const fetchTFLData = async (mode, tflKey) => {
        const url = `${TFL_API_BASE_URL}${mode}/status?app_id=${tflKey}`;
        const response = await fetch(url);
        return response.json();
    };

    try {
        const tubeData = await fetchTFLData('tube', tflKey);
        const elizabethData = await fetchTFLData('elizabeth-line', tflKey);
        const dlrData = await fetchTFLData('dlr', tflKey);
        const tramData = await fetchTFLData('tram', tflKey);
        const overgroundData = await fetchTFLData('overground', tflKey);
        
        const timestampISO = new Date().toISOString();
        const readableTimestamp = new Date(timestampISO).toLocaleString();

        const result = [ {
          tubeData: tubeData,
          elizabethData: elizabethData,
          dlrData: dlrData,
          tramData: tramData,
          overgroundData: overgroundData,
          timestampISO: timestampISO
        }
        ];
        
        const oldData = await kamran.database.getDatabase(databaseId);
        const cash = await kamran.database.cash(databaseId, result);
        compairData(oldData.data, result);

        let msg = '';
        if(cash.status == true) {
            msg = (`Data Saved to, ${databaseId}, *${readableTimestamp}*`);
        } else {
            msg = (`Error saving data to, ${databaseId}, *${readableTimestamp}*`);
            console.error('Error running periodic task:', cash);

        }

        kamran.externalComunicaion.sendWebhookMessage(process.env.DTFLDATA, msg);

    } catch (error) {
        console.error('Error running periodic task:', error);
    }
}

export function setTflData() {
    setData(); // Run the task initially
    setInterval(setData, 90 * 1000); // 1 minute 30 seconds in milliseconds
}
