const express = require("express");
const { addPatient } = require("../controllers/patientController");

const router = express.Router();

router.post("/patient", addPatient);

module.exports = {
  routes: router,
};
