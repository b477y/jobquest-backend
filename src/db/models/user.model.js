import mongoose from "mongoose";
import { AuthProviders, Genders, OtpTypes, UserRole } from "../../utils/enum/enum.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(AuthProviders),
      default: AuthProviders.SYSTEM,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Genders),
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          return value < today && age >= 18;
        },
        message:
          "DOB must be before the current date and age must be greater than or equal to 18.",
      },
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    bannedAt: Date,
    deletedAt: Date,
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    changeCredentialsTime: Date,
    profilePic: { secure_url: String, public_id: String },
    coverPic: { secure_url: String, public_id: String },
    OTP: [
      {
        code: { type: String, required: true },
        type: {
          type: String,
          enum: Object.values(OtpTypes),
          required: true,
        },
        expiresIn: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("username").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
