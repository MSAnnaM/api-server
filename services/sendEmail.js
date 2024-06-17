import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_PASS, EMAIL_META } = process.env;

export const sendMail = async (email, comment) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    auth: {
      user: EMAIL_META,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_META,
    to: "momotanna.m@gmail.com",
    subject: "Need Help",
    html: `<h1>Email to answer: ${email}<br>Comment: ${comment}</h1>`,
    text: `Email to answer: ${email}\nComment: ${comment}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
