const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  type: String,
  user: String,
  origin: String,
  destination: String,
  date: String,
  distance: String,
  time: String,
  price: Number,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Routes = mongoose.model("Routes", routesSchema);

module.exports = Routes;