"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const auth = firebase.auth();

const addDoctor = async (req, res, next) => {
	try {
		const {
			nombre,
			apellido,
			email,
			telefono,
			contrasena,
			conf_contrasena,
			especialidad,
		} = req.body;

		let errores = "";

		let camposFaltantes = "";
		if (!nombre.trim()) camposFaltantes += "* Nombre\n";
		if (!apellido.trim()) camposFaltantes += "* Apellido(s)\n";
		if (!email.trim()) camposFaltantes += "* Email\n";
		if (!telefono.trim()) camposFaltantes += "* Numero telefonico\n";
		if (!contrasena.trim()) camposFaltantes += "* Contrasena\n";
		if (!conf_contrasena.trim())
			camposFaltantes += "* Confirmar contrasena\n";
		if (!especialidad.trim()) camposFaltantes += "Especialidad\n";

		if (camposFaltantes) errores += "Campos faltantes:\n" + camposFaltantes;

		if (contrasena != conf_contrasena)
			errores += "Las contrasenas no coinciden";

    if (errores) res.status(400).json(errores);

		const newUser = await auth.createUser({
			email: email,
			password: contrasena,
			displayName: nombre,
		});

		await firestore.collection("Doctors").doc().set({
			nombre,
			apellido,
			email,
			telefono,
			especialidad,
		});
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
