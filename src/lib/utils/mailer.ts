import nodemailer from "nodemailer"
import { configurations } from "../config";

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_AUTH_USER, // Your Outlook email address
    pass: process.env.SMTP_AUTH_PASSWORD, // Your Outlook password or app password if 2FA is enabled
  },
});



type TMailBody = {
  subject: string,
  text: string,
  html?: string
}

export async function sendEmail ( email:string, body:TMailBody ) {
  try {
    await transporter.sendMail({
      from: configurations.smtp_sender_email, // se
      to: email, // receiver email
      ...body,
    });

    return true
  } catch(err) {
    console.log(err)
    return false
  }
}