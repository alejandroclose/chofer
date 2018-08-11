const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
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

const User = mongoose.model("Trips", userSchema);

module.exports = Trips;