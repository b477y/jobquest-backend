import mongoose from "mongoose";
import {
  AuthProviders,
  Genders,
  OtpTypes,
  UserRole,
} from "../../utils/enum/enum.js";
import { generateHash } from "../../utils/security/hash.security.js";
import { decrypt, encrypt } from "../../utils/security/crypto.security.js";

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
      required: (data) => {
        return data?.provider === AuthProviders.GOOGLE ? false : true;
      },
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
      required: (data) => {
        return data?.provider === AuthProviders.GOOGLE ? false : true;
      },
      set: (value) => value.toLowerCase(),
    },
    DOB: {
      type: Date,
      required: (data) => {
        return data?.provider === AuthProviders.GOOGLE ? false : true;
      },
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
      unique: true,
      required: (data) => {
        return data?.provider === AuthProviders.GOOGLE ? false : true;
      },
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
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("username").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await generateHash({ plaintext: this.password });
  }

  if (this.isModified("mobileNumber")) {
    this.mobileNumber = await encrypt({ plaintext: this.mobileNumber });
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.mobileNumber) {
    update.mobileNumber = await encrypt({ plaintext: update.mobileNumber });
  }

  if (update.password) {
    update.password = await generateHash({ plaintext: update.password });
  }

  next();
});

userSchema.post("findOne", async function (doc) {
  if (doc && doc.mobileNumber && typeof doc.mobileNumber === "string") {
    const decryptedNumber = await decrypt({ cipherText: doc.mobileNumber });
    doc.mobileNumber = decryptedNumber;
  }
});

userSchema.post("find", async function (docs) {
  docs.forEach(async (doc) => {
    if (doc.mobileNumber) {
      doc.mobileNumber = await decrypt({ cipherText: doc.mobileNumber });
    }
  });
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
