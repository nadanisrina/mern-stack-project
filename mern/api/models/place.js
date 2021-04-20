import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model
const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true }
});

const placeModel = model("Place", placeSchema);

export { placeModel, placeSchema };
