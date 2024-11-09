const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var LMSchema = new mongoose.Schema(
  {
    link : {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const LM = mongoose.model("LM", LMSchema);
module.exports ={ LM };
