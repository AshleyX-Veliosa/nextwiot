import mongoose, { Schema, model, Document } from "mongoose";

interface IData extends Document {
  Humidity: number;
  Temperature: number;
  TimeString: string;
}

// Define a schema for the data
const dataSchema = new Schema<IData>({
  Humidity: { type: Number, required: true },
  Temperature: { type: Number, required: true },
  TimeString: { type: String, required: false },
});

const DataModel = mongoose.models.Data || model<IData>("Data", dataSchema);
export default DataModel;