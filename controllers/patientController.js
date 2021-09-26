'use strict';

const firebase = require("../db");
const Patient = require("../models/patient");

const firestore = firebase.firestore();

const addPatient = async(req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("Patients").doc().set(data);
        res.send("Record saved successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPatient
}
