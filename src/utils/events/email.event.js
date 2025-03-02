import { EventEmitter } from "node:events";
import UserModel from "../../db/models/user.model.js";
import sendEmail from "../email/send.email.js";
import confirmEmailTemplate from "../email/templates/confirmEmail.template.js";
import forgotPasswordTemplate from "../email/templates/forgotPassword.template.js";
import applicationAcceptedTemplate from "../email/templates/applicationAccepted.template.js";
import applicationRejectedTemplate from "../email/templates/applicationRejected.template.js";
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

  const html = template({ OTP });
  await sendEmail({ to: email, subject, html });
};

export const sendApplicationStatus = async ({ data, subject, template } = {}) => {
  const { email } = data;
  const html = template();
  await sendEmail({ to: email, subject, html });
};

emailEvent.on("sendConfirmEmail", async (data) => {
  await sendOTP({
    data,
    subject: OtpTypes.CONFIRM_EMAIL,
    template: confirmEmailTemplate,
  });
});

emailEvent.on("forgotPassword", async (data) => {
  await sendOTP({
    data,
    subject: OtpTypes.FORGOT_PASSWORD,
    template: forgotPasswordTemplate,
  });
});

emailEvent.on("applicationAccepted", async (data) => {
  await sendApplicationStatus({
    data,
    subject: "Application accepted",
    template: applicationAcceptedTemplate,
  });
});

emailEvent.on("applicationRejected", async (data) => {
  await sendApplicationStatus({
    data,
    subject: "Application rejected",
    template: applicationRejectedTemplate,
  });
});
