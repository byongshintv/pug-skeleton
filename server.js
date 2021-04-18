const express = require('express');
const https = require('https');
const fs = require('fs');
const pug = require('pug');
const PORT = 3000;
const app = express();
require("./router/main")(app)

app.use(express.static("public"))
app.set('views', __dirname + '/views');
app.set('view engine','pug')
//https.createServer(app).listen(PORT);

app.listen(PORT)