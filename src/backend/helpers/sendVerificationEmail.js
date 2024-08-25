import { VERIFY } from "../../utils/constants";
import VerificationEmail from "../../emails/VerificationEmail";
import ForgotPassword from "../../emails/ForgotPassword";
import { resend } from "./resend";

export async function sendVerificationEmail({
  email,
  username,
  verifyToken,
  type,
}) {
  try {
    const template =
      type === VERIFY
        ? VerificationEmail({ username, otp: verifyToken })
        : ForgotPassword({ username, otp: verifyToken });

    await resend.emails.send({
      from: "Aeme <noreply@recomendtube.in>",
      to: email,
      subject: "Mystery Message Verification Code",
      react: template,
    });
    console.log("email success");

    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
