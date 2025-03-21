import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String, //optional image url
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          status: { type: String, enum: ["going", "not going", "maybe"], default: "maybe" },
        },
      ],

    // attendees: [{ 
    //     type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
