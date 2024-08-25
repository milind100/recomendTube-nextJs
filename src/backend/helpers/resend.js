import { Resend } from "resend";
// eslint-disable-next-line no-undef
export const resend = new Resend(process.env.RESEND_API_KEY);
