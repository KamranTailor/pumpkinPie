// functions/main.js


import addEntry from './database/addEntry.js';
import cash from './database/cash.js';
import deleteEntry from './database/deleteEntry.js';
import editEntry from './database/editEntry.js';
import getDatabase from './database/getDatabase.js';

import sendEmail from './externalComunication/email.js';
import sendWebhookMessage from './externalComunication/discord.js';

import createSession from './sessions/createSession.js';
import deleteSession from './sessions/deleteSession.js';

import setActivity from './activity/setActivaty.js';

import checkHeaders from './requests/checkHeaders.js';
import checkHeadersAdmin from './requests/checkHeadersAdmin.js';


export default {
    database: {
        addEntry,
        cash,
        deleteEntry,
        editEntry,
        getDatabase
    },
    externalComunicaion: {
        sendEmail,
        sendWebhookMessage
    },
    sessions: {
        createSession,
        deleteSession
    },
    activity: {
        setActivity
    },
    authentication: {
        checkHeaders,
        checkHeadersAdmin
    }
};