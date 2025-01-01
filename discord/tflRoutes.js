import kamran from '../functions/main.js';

export async function getStatus() {
    const responce = await kamran.database.getDatabase("7750a3bc-1372-4485-9581-8516193b3f6e");
    console.log(responce);
    
    let toSend = "";

    toSend += "Tube\n";
    for (let i in responce.data[0].tubeData) {
        toSend += `${responce.data[0].tubeData[i].name}: ${responce.data[0].tubeData[i].lineStatuses[0].statusSeverityDescription}\n`;
    }

    toSend += "Overground\n";
    for (let i in responce.data[0].overgroundData) {
        toSend += `${responce.data[0].overgroundData[i].name}: ${responce.data[0].overgroundData[i].lineStatuses[0].statusSeverityDescription}\n`;
    }

    toSend += "Other\n";
    toSend += `${responce.data[0].elizabethData[0].name}: ${responce.data[0].elizabethData[0].lineStatuses[0].statusSeverityDescription}\n`;
    toSend += `${responce.data[0].dlrData[0].name}: ${responce.data[0].dlrData[0].lineStatuses[0].statusSeverityDescription}\n`;
    toSend += `${responce.data[0].tramData[0].name}: ${responce.data[0].tramData[0].lineStatuses[0].statusSeverityDescription}\n`;

    toSend += `Last Updated ${responce.data[0].timestampISO}\n`;

    return toSend;
}