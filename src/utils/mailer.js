import { User } from "@/models/user.models.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    emailType === "VERIFY"
      ? await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        })
      : await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });

    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href=${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verifyemail?token=${encodeURIComponent(
              hashedToken
            )}`
          : `${process.env.DOMAIN}/forgotpassword?token=${encodeURIComponent(
              hashedToken
            )}`
      }>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    return { error: error.message };
  }
};

export { sendEmail };
