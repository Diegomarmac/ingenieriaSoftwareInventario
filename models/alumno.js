var mongoose = require("mongoose");

var alumnoSchema = new mongoose.Schema({
    nombre: String,
    apellidopat: String,
    apellidomat: String,
    foto: String,
    telocal: String,
    telcel: String,
    nombretutor: String,
    teltuto: String,
    direalu: String,
    captra: String,
    tipoplan: String,
    fechae: String,
    nombreasesor: String,
    created: {type: Date, default:Date.now}
});

module.exports = mongoose.model("Alumno", alumnoSchema);