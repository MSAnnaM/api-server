import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_PASSWORD, UKR_NET_FROM } = process.env;

export const sendMail = async (email, comment) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: UKR_NET_FROM,
      pass: UKR_PASSWORD,
    },
  });

  const mailOptions = {
    from: "intrum2025@ukr.net",
    to: "taskpro.project@gmail.com",
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
