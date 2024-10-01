//main.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import kamran from '../functions/main.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//NO API KEY 
import sighnUpRouter from './authentication/signUp.js';
app.use('/sighnUp', sighnUpRouter);
import loginRouter from './authentication/login.js';
app.use('/login', loginRouter);
import getUserRouter from './authentication/getUser.js';
app.use('/getUser', getUserRouter);
import getUserServiceRouter from './authentication/getUserService.js';
app.use('/getUserService', getUserServiceRouter);

//TUBE TIME
import getTubeStatusRouter from './tubeTime/getStatus.js';
app.use('/tubeTime/status', kamran.authentication.checkHeaders, getTubeStatusRouter);

//SPOTFY AUTH
import loginSpotifyRouter from './spotify/login.js'
app.use('/spotify/login',  loginSpotifyRouter);
import internalCallbackRouter from './spotify/internalCallback.js'
app.use('/spotify/interalCallback',  internalCallbackRouter);
import refreshTokenRouter from './spotify/refreshToken.js'
app.use('/spotify/refreshToken',  refreshTokenRouter);

//SPOTFY 
import getSpotifyDataRouter from './spotify/getSpotifyData.js'
app.use('/spotify/data', kamran.authentication.checkHeaders, getSpotifyDataRouter);
import actionChangeRouter from './spotify/actionChange.js'
app.use('/spotify/actionChange', actionChangeRouter);

//ADMIN
import adminGetUsersRouter from './admin/getUsers.js';
app.use('/admin/adminGetUsers',  kamran.authentication.checkHeadersAdmin, adminGetUsersRouter);
import adminGetSpotifyAccount from './admin/spotifyAdmin.js';
app.use('/admin/spotify',  kamran.authentication.checkHeadersAdmin, adminGetSpotifyAccount);
import adminDeleteAccount from './admin/deleteUser.js';
app.use('/admin/user/delete',  kamran.authentication.checkHeadersAdmin, adminDeleteAccount);
import adminEditAccount from './admin/editUser.js';
app.use('/admin/user/edit',  kamran.authentication.checkHeadersAdmin, adminEditAccount);
export default app;