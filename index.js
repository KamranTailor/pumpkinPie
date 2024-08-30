// index.js

const version = "V1";

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
//import localUtils from './utils/main.js';
import fs from 'fs/promises';

//dotenv.config();
//const port =  8080;
//import app from './main.js';

async function addArray(databaseId, newArray) {
    const response = await fetch('http://localhost:9090/addEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, newArray: newArray }) // Use newArray instead of array
    });
    const data = await response.json();
    console.log(data);
}

async function deleteEntry(databaseId, entryId) {
    const response = await fetch('http://localhost:9090/deleteEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, entryId: entryId }) // Use newArray instead of array
    });
    const data = await response.json();
    console.log(data);
}

//addArray("test", { value: "test" }); // This should now work with the updated key
deleteEntry("test", "3c325226-bbb4-460c-b5f5-1345aef75520"); // This should now work with the updated key



//app.get('/version', (request, response) => {response.json({version: version})});
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'));
//app.listen(port, () => console.log(`Listening at port ${port}`));