const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  origen: String,
  destino: String,
  distancia: String,
  km: String,
  precio: Number,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Routes = mongoose.model("Routes", routesSchema);

module.exports = Routes;