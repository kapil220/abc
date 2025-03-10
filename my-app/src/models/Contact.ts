import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  fullPhone: { type: String, required: true },
  email: { type: String, required: true },
  query: { type: String, required: false }, // Explicitly not required
  submissionDate: { type: String, required: true },
  timestamp: { type: String, required: true },
});


export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);