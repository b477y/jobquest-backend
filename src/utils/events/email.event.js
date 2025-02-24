import { EventEmitter } from "node:events";
import UserModel from "../../db/models/user.model.js";
import sendEmail from "../email/send.email.js";
import confirmEmailTemplate from "../email/templates/confirmEmail.template.js";
import forgetPasswordTemplate from "../email/templates/forgetPassword.template.js";
import generateOTP from "../../utils/email/generateOTP.js";
import * as dbService from "../../db/db.service.js";
import { OtpTypes } from "../enum/enum.js";

export const emailEvent = new EventEmitter();

export const sendOTP = async ({ data, subject, template } = {}) => {
  const { id, email } = data;
  const { hashedOTP, OTP } = generateOTP();
  const OTP_EXPIRATION_TIME = parseInt(process.env.OTP_EXPIRATION_TIME);
  const expirationTime = new Date(Date.now() + OTP_EXPIRATION_TIME);

  const otpEntry = {
    code: hashedOTP,
    type: subject,
    expiresIn: expirationTime,
  };

  await dbService.findByIdAndUpdate({
    model: UserModel,
    id,
    data: {
      $push: { OTP: otpEntry },
    },
  });

  setTimeout(async () => {
    await dbService.updateOne({
      model: UserModel,
      filter: { email },
      data: {
        $pull: { OTP: { expiresIn: { $lte: new Date() } } },
      },
    });
  }, OTP_EXPIRATION_TIME);

  const html = template({ OTP });
  await sendEmail({ to: email, subject, html });
};

emailEvent.on("sendConfirmEmail", async (data) => {
  await sendOTP({
    data,
    subject: OtpTypes.CONFIRM_EMAIL,
    template: confirmEmailTemplate,
  });
});

emailEvent.on("forgetPassword", async (data) => {
  await sendOTP({
    data,
    subject: OtpTypes.FORGET_PASSWORD,
    template: forgetPasswordTemplate,
  });
});
