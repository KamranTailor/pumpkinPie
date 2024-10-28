import kamran from "../functions/main.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config();

const databaseId = "d0663c45-efb8-4149-8ef6-ef2273e47f45";

async function setData() {
    try {
        const requestOptions = {
            headers: {
                'x-api-key': process.env.FNBR // Use the API key from environment variables
            }
        };

        // Fetch the item shop data from the Fortnite API
        const response = await fetch("https://fnbr.co/api/shop", requestOptions);
        const data = await response.json();

        // Create a map of shop items by ID
        let shopItems = {};
        for (let shopItem of data.data.featured) {
            shopItems[shopItem.id] = shopItem;
        }

        // Create a new structure for the data with section-based items
        let newShopItems = [];
        for (let section of data.data.sections) { 
            const sectionData = {
                sectionName: section.displayName,
                sectionId: section.key,
                items: []
            };

            // Add the items from the section to the new structure
            for (let itemId of section.items) { 
                if (shopItems[itemId]) {
                    sectionData.items.push(shopItems[itemId]);
                }
            }

            newShopItems.push(sectionData);
        }

        const cash = await kamran.database.cash(databaseId, newShopItems);

        const timestampISO = new Date().toISOString();
        const readableTimestamp = new Date(timestampISO).toLocaleString();

        let msg = '';
        if (cash.status == true) {
            msg = (`Data Saved to, ${databaseId}, *${readableTimestamp}*`);
        } else {
            msg = (`Error saving data to, ${databaseId}, *${readableTimestamp}*`);
            console.error('Error running periodic task:', cash);
        
        }

        kamran.externalComunicaion.sendWebhookMessage(process.env.DITEMSHOP, msg);
    } catch (error) {
        console.error('Error running periodic task:', error);
    }
}

export function fetchForniteShop() {
    setData(); // Run the task initially
    const task = cron.schedule('5 0 * * *', () => {
        setData()
    }, {
        scheduled: true,
        timezone: "GMT" // Set your timezone here
    });
}
