function Patient(id, nombre, apellido, sexo, fechaNacimiento, edad, estadoCivil, email, celular) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.sexo = sexo;
    this.fechaNacimiento = fechaNacimiento;
    this.edad = edad;
    this.estadoCivil = estadoCivil;
    this.email = email;
    this.celular = celular;
}

module.exports = Patient;