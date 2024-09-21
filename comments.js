// Create web server
const express = require('express');
const app = express();
//create server
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);