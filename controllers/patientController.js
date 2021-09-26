'use strict';

const firebase = require("../db");
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

const getPatient = async(req, res, next) => {
    try {
        const id = req.params.id;
        const patient = await firestore.collection("Patients").doc(id);
        const data = await patient.get();

        if (data.exists) {
            res.send(data.data());
        } else {
            res.status(400).send("Patient with the given id not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePatient = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const patient = await firestore.collection("Patients").doc(id);
        await patient.update(data);
        res.send("Patient record updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePatient = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection("Patients").doc(id).delete();
        res.send("Record deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPatient,
    getPatient,
    updatePatient, 
    deletePatient
}
