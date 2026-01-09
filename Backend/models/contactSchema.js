import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: Number },
    query: { type: String },
    concern: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});
export const contactModel = mongoose.model("contact", contactSchema);
