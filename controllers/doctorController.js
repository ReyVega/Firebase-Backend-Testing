"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const auth = firebase.auth();

const addDoctor = async (req, res, next) => {
  try {
    const data = req.body;

    const newUser = await auth.createUser({
      email: data.email,
      password: data.contrasena,
      displayName: data.nombre,
    });

    await firestore.collection("Doctors").doc().set(data);
    res.send("Record saved succesfully");
    res.status(200).json({ doctorId: newUser.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getDoctor = async (req, res, next) => {
  try {
    const id = req.params.doctorId;
    const doctor = await firestore.collection("Doctors").doc(id);
    const data = await doctor.get();

    if (data.exists) {
      res.status(200).json({ doctorId: data.id });
    } else {
      res.status(400).send("Doctor with the given id not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const patient = await firestore.collection("Doctors").doc(id);
    await patient.update(data);
    res.send("Patient record updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("Doctors").doc(id).delete();
    res.send("Record deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
