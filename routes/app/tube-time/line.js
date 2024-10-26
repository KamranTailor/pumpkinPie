import express from 'express';
import kamran from "../../../functions/main.js";
const router = express.Router();
import { promises as fs } from 'fs';

async function getOporatingTrains(lineId) {
    const api_urls = [
        {
            lineId: "bakerloo",
            trackernetId: "B",
            databaseId: "9130f40e-3e93-4973-a222-7cc245c0bd8e",
            url: "https://api.tfl.gov.uk/Line/bakerloo/Arrivals"
        },
        {
            lineId: "central",
            trackernetId: "C",
            databaseId: "0f1dc40f-c54b-40ca-ba4c-bb46e3674ece",
            url: "https://api.tfl.gov.uk/Line/central/Arrivals"
        },
        {
            lineId: "circle",
            trackernetId: "D",
            databaseId: "0f663091-0f2e-4e08-b204-cf8852067ff3 ",
            url: "https://api.tfl.gov.uk/Line/circle/Arrivals"
        },
        {
            lineId: "district",
            trackernetId: "E",
            databaseId: "3aed84aa-1136-40b6-8dad-03302f7b0c10",
            url: "https://api.tfl.gov.uk/Line/district/Arrivals"
        },
        {
            lineId: "hammersmith-city",
            trackernetId: "F",
            databaseId: "0fb691b0-da40-42c9-898e-23fbd98a6290",
            url: "https://api.tfl.gov.uk/Line/hammersmith-city/Arrivals"
        },
        {
            lineId: "jubilee",
            trackernetId: "G",
            databaseId: "84f6a03b-543a-49e7-9698-52b627532ba3",
            url: "https://api.tfl.gov.uk/Line/jubilee/Arrivals"
        },
        {
            lineId: "metropolitan",
            trackernetId: "H",
            databaseId: "b5442b60-f297-4777-b40e-c64ecd770395",
            url: "https://api.tfl.gov.uk/Line/metropolitan/Arrivals"
        },
        {
            lineId: "northern",
            trackernetId: "I",
            databaseId: "3a333b9b-fbfb-4953-92be-39241c95477b",
            url: "https://api.tfl.gov.uk/Line/northern/Arrivals"
        },
        {
            lineId: "piccadilly",
            trackernetId: "J",
            databaseId: "62322420-5e47-47d5-ae8f-b3c098d4e8e2",
            url: "https://api.tfl.gov.uk/Line/piccadilly/Arrivals"
        },
        {
            lineId: "victoria",
            trackernetId: "K",
            databaseId: "45d26b3f-bc44-4686-9d83-c54cdd851346",
            url: "https://api.tfl.gov.uk/Line/victoria/Arrivals"
        },
        {
            lineId: "waterloo-city",
            trackernetId: "L",
            databaseId: "e7a82347-b6ff-43e7-9ed0-9328b5987181",
            url: "https://api.tfl.gov.uk/Line/waterloo-city/Arrivals"
        },
        {
            lineId: "london-overground",
            trackernetId: null,
            databaseId: "7f9d7ac7-27ac-425a-81f5-54914b71e311",
            url: "https://api.tfl.gov.uk/Line/london-overground/Arrivals"
        },
        {
            lineId: "elizabeth",
            trackernetId: null,
            databaseId: "b98ffd6e-7ad7-4d29-8148-d6c4e4a1d50f",
            url: "https://api.tfl.gov.uk/Line/elizabeth/Arrivals"
        },
        {
            lineId: "dlr",
            trackernetId: null,
            databaseId: "ab297b5a-7cbe-4b97-afa2-c11557f817d1",
            url: "https://api.tfl.gov.uk/Line/dlr/Arrivals"
        },
        {
            lineId: "tram",
            trackernetId: null,
            databaseId: "66734574-5781-46e4-82d5-421d49099edd",
            url: "https://api.tfl.gov.uk/Line/tram/Arrivals"
        }
    ];

    for (let line in api_urls) {
        if (api_urls[line].lineId === lineId) {
            const data = await kamran.database.getDatabase(api_urls[line].databaseId);
            return data.data;
        }
    }
}

router.get('/tfl-status-line', async (request, response) => {
    try {
        const { id } = request.query;
        
        const responce = await kamran.database.getDatabase("7750a3bc-1372-4485-9581-8516193b3f6e");
        const data = responce.data;

        let stopPointUrl = "";
        let lineStatus;

        switch (id) {
            case "dlr":
                lineStatus = data[0].dlrData[0];
                stopPointUrl = "https://api.tfl.gov.uk/StopPoint/Mode/dlr";
                break;
            case "london-overground":
                lineStatus = data[0].overgroundData[0];
                stopPointUrl = "https://api.tfl.gov.uk/StopPoint/Mode/london-overground";
                break;
            case "tram":
                lineStatus = data[0].tramData[0];
                stopPointUrl = "https://api.tfl.gov.uk/StopPoint/Mode/tram";
                break;
            case "elizabeth":
                lineStatus = data[0].elizabethData[0];
                stopPointUrl = "https://api.tfl.gov.uk/StopPoint/Mode/elizabeth";
                break;
            default:
                for (let i in data[0].tubeData) {
                    if (data[0].tubeData[i].id === id) {
                        lineStatus = data[0].tubeData[i];
                    }
                }
                stopPointUrl = "https://api.tfl.gov.uk/StopPoint/Mode/tube";
                break;
        }


        const dataStations = await fs.readFile(`./dataset/tfl-lines/${id}.json`, 'utf8');
        const dataStationsJSON = JSON.parse(dataStations);
        
        const liftDisruptionData = await kamran.database.getDatabase("4e5aeaf3-acb8-4dc5-b208-2c13ce5b26dd")
        const op = await getOporatingTrains(id);

        if (lineStatus) {
            response.json({ 
                lineStatus, 
                name: lineStatus.name, 
                stations: dataStationsJSON, 
                amoutOfStations: dataStationsJSON.length,
                liftDisruptions: liftDisruptionData,
                operatingTrains: op,
                operatingTrainsAmount: op.length,
            });
        } else {
            response.status(404).json({ error: "Line status not found" });
        }

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;