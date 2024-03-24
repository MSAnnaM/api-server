import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_PASSWORD, UKR_NET_FROM } = process.env;

export const sendMail = async (email, comment) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 2525
    auth: {
      user: UKR_NET_FROM,
      pass: UKR_PASSWORD,
    },
  });

  const mailOptions = {
    from: UKR_NET_FROM,
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
