import mongoose, { Schema, Document } from "mongoose";

export interface INormalization extends Document {
  canonicalName: string;
  variations: string[];
  phoneticKeys: string[];
  category: string;
}

const normalizationSchema: Schema = new Schema({
  canonicalName: { type: String, required: true, unique: true },
  variations: { type: [String], default: [], index: true },
  phoneticKeys: { type: [String], default: [], index: true },
  category: { type: String, required: true },
});

export default mongoose.model<INormalization>("Normalization", normalizationSchema);