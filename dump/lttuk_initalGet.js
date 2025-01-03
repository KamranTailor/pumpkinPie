// Imports
import kamran from "../functions/main.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Load environment variables
dotenv.config();

// Initialize Firebase
const serviceAccount = JSON.parse(
    await readFile(new URL("../lttuk-serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Data Constants
const setOne = [
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
    }
];

const setTwo = [
    {
        lineId: "liberty",
        trackernetId: null,
        databaseId: "0ff6c5de-b9d3-4746-9392-d676bc3a53b2",
        url: "https://api.tfl.gov.uk/Line/liberty/Arrivals"
    },
    {
        lineId: "lioness",
        trackernetId: null,
        databaseId: "f21bc3d5-c3d4-473d-ba34-b88dec64c9d6",
        url: "https://api.tfl.gov.uk/Line/lioness/Arrivals"
    },
    {
        lineId: "mildmay",
        trackernetId: null,
        databaseId: "327562e3-1276-45be-9d7b-998001573d46",
        url: "https://api.tfl.gov.uk/Line/mildmay/Arrivals"
    },
    {
        lineId: "suffragette",
        trackernetId: null,
        databaseId: "3a2869a4-6ba8-4bb3-89ce-de6d37d00fb6",
        url: "https://api.tfl.gov.uk/Line/suffragette/Arrivals"
    },
    {
        lineId: "weaver",
        trackernetId: null,
        databaseId: "a450f3f7-23ae-4770-8f3b-0a7abe10df6f",
        url: "https://api.tfl.gov.uk/Line/weaver/Arrivals"
    },
    {
        lineId: "windrush",
        trackernetId: null,
        databaseId: "4e9aff57-f8f5-4c36-aa14-ffed689beef9",
        url: "https://api.tfl.gov.uk/Line/windrush/Arrivals"
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

async function clearCollection(collectionName) {
    try {
        const snapshot = await db.collection(collectionName).get();
        const batch = db.batch();

        snapshot.forEach(doc => {
            batch.delete(doc.ref); // Delete each document reference
        });

        await batch.commit(); // Commit the batch delete
        console.log(`Cleared all documents from collection: ${collectionName}`);
    } catch (error) {
        console.error(`Error clearing collection ${collectionName}:`, error);
    }
}

// Function to add data to Firestore
async function addData(collectionName, dataArray) {
    try {
        const cash = await kamran.database.cash(collectionName, dataArray);
        if (cash.status) {
            //console.log(`Batch write completed successfully to collection: ${collectionName}`);
        } else {
            console.error(`Error writing to collection: ${collectionName}`);
        }
    } catch (error) {
        console.error("Error adding documents:", error);
    }
}

// Fetch data from TfL API
async function fetchData(url) {
    try {
        const response = await fetch(`${url}?app_id=${process.env.TFL_LTTUK_API_ID}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

// Set data in Firestore for each line
async function setData(url_set) {
    
    let api_urls;
    if (url_set === "one") {
        api_urls = setOne;
    } else {
        api_urls = setTwo;
    }

    for (const line of api_urls) {
        // Clear existing documents in the collectio

        //Fetch New Data
        const data = await fetchData(line.url);
        if (data) {
            //console.log(`Fetched data for ${line.lineId}`);
            let newData = [];
            for (let train of data) { // Use `of` instead of `in` for arrays
                const existingIndex = newData.findIndex(item => item.vehicleId === train.vehicleId);

                if (existingIndex !== -1) {
                    // There's an existing entry with the same vehicleId
                    const existingEntry = newData[existingIndex];

                    // Compare timeToStation values
                    if (train.timeToStation < existingEntry.timeToStation) {
                        // Update with the new entry if timeToStation is lower
                        newData[existingIndex] = {
                            vehicleId: train.vehicleId || null,
                            timeToStation: train.timeToStation || null,
                            read: train.timing.read || null,
                            currentLocation: train.currentLocation || null,
                            destinationName: train.destinationName || null,
                            expectedArrival: train.expectedArrival || null,
                            platformName: train.platformName || null,
                        };
                    }
                } else {
                    // No existing entry found, so add the new one
                    newData.push({
                        vehicleId: train.vehicleId || null,
                        timeToStation: train.timeToStation || null,
                        read: train.timing.read || null,
                        currentLocation: train.currentLocation || null,
                        destinationName: train.destinationName || null,
                        expectedArrival: train.expectedArrival || null,
                        platformName: train.platformName || null,
                    });
                }
            }
            await addData(line.databaseId, newData); // Await to ensure completion
        } else {
            console.log(`Error fetching data for ${line.lineId}`);
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Exported function to cache data
export async function cashLttukData() {
    await setData("one"); // Ensure "one" completes first
    setInterval(() => setData("one"), 240000);

    await delay(120000); // Wait before starting the next set
    await setData("two");
    setInterval(() => setData("two"),  240000);
}
