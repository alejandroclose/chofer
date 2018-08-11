const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tarifasSchema = new Schema({
     Coste : Number,
     Lavorable: Number,
     Weekend: Number,
     Aereopuerto: Number,
     Maletas: Number,
     Festivo: Number,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const User = mongoose.model("Tarifas", userSchema);

module.exports = Tarifas;