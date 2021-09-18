require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routers');
const cors = require('cors')
require('./config/db');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.listen(port, () => {
    console.log(`Server connected in http://localhost:${port}`)
});