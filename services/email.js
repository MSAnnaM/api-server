import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { EMAIL_META, EMAIL_PASS } = process.env;

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_META,
        pass: EMAIL_PASS,
    },
};

const transporter = nodemailer.createTransport(config);

export const sendEmail = (data) => {
  const email = { ...data, from: EMAIL_META };
  return transporter.sendMail(email);
};
