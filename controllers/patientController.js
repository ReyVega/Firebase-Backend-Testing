"use strict";

const firebase = require("../db");
const Patient = require("../models/patient");
const firestore = firebase.firestore();

const addPatient = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("Patients").doc().set(data);
        res.send("Record saved successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPatients = async (req, res, next) => {
    try {
        const doctorId = req.query.doctorId;

        const patients = await firestore
            .collection("Patients")
            .where("doctorId", "==", doctorId);

        const data = await patients.get();

        const patientsArray = [];

        if (data.empty) {
            res.status(400).send(error.message);
        } else {
            data.forEach((doc) => {
                const patient = new Patient(
                    doc.id,
                    doc.data().nombre,
                    doc.data().apellido,
                    doc.data().sexo,
                    doc.data().fechaNacimiento,
                    doc.data().edad,
                    doc.data().estadoCivil,
                    doc.data().correo,
                    doc.data().celular
                );
                patientsArray.push(patient);
            });
            res.send(patientsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPatient = async (req, res, next) => {
    try {
        const id = req.query.id;
        const patient = await firestore.collection("Patients").doc(id);
        const data = await patient.get();

        if (data.exists) {
            res.status(200).json(data);
        } else {
            res.status(400).send("Patient with the given id not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updatePatient = async (req, res, next) => {
    try {
        const id = req.query.id;
        const data = req.body;
        const patient = await firestore.collection("Patients").doc(id);
        await patient.update(data);
        res.send("Patient record updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deletePatient = async (req, res, next) => {
    try {
        const id = req.query.id;
        await firestore.collection("Patients").doc(id).delete();
        res.send("Record deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
};
