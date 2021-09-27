'use strict';

const express = require("express");
const cors = require("cors");
const config = require("./config");
const patientRoutes = require("./routes/patient-routes");
const doctorRoutes = require("./routes/doctor-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', patientRoutes.routes, doctorRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));