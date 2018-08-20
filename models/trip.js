const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
     Name: String,
     Origin: String,
     Destination: String,
     Data: Date,
     Service: String,
     Cost: Number,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

