import mongoose, { Schema, Document, model, Model } from 'mongoose';

interface ITmr extends Document {
  Humidity: number;
  Temperature: number;
  TimeString: string;
}

const TmrSchema: Schema = new Schema({
  Humidity: { type: Number, required: true },
  Temperature: { type: Number, required: true },
  TimeString: { type: String, required: false },
});

const TmrModel: Model<ITmr> = mongoose.models.Tmr || model<ITmr>('Tmr', TmrSchema);

export default TmrModel;
