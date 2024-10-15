import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    teacherStatus: {
      type: String,
      enum: ["Williams", "Grimes", "Waginger"],
      default: "pending",
    },
    LicenseType: {
      type: String,
      enum: ["A7dfH791", "T8IJFOC7", "DA34C764"],
      default: "A7dfH791",
    },
    schoolLocation: {
      type: String,
      default: "Holly Springs",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
