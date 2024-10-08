import express from 'express';
import kamran from "../../../functions/main.js";
const router = express.Router();

router.get('/tfl-status-line', async (request, response) => {
    try {
        const { id } = request.query;
        console.log(id);
        
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

        if (lineStatus) {
            response.json({ lineStatus });
        } else {
            response.status(404).json({ error: "Line status not found" });
        }

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;