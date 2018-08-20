const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
     username: String,
     origin: String,
     destination: String,
     service: String,
     cost: Number,
     distance: Number
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

