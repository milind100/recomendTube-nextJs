import nodemailer from "nodemailer";
import { mailSubjects, VERIFY } from "../../utils/constants";

export const nodemailerForTest = async ({
  email,
  username,
  verifyCode,
  type,
}) => {
  try {
    var transport = nodemailer.createTransport({
      // eslint-disable-next-line no-undef
      host: process.env.MAIL_TRAP_HOST,
      port: 587,
      auth: {
        // eslint-disable-next-line no-undef
        user: process.env.MAIL_TRAP_USER,
        // eslint-disable-next-line no-undef
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `RecomendTube`, // sende
      to: email, // list of receivers
      subject: mailSubjects?.[type], // Subject line
      html: `<p>Hello this is your otp for ${
        type === VERIFY ? "verify your email" : "forgot password"
      }</p>
      <h1>${username}<b/>
      <h3><b>${verifyCode}<b/></h3>
      `, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
