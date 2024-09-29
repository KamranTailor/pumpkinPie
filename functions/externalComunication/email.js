// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email = "kamran_tailor@hotmail.com";
const password = process.env.OUTLOOK;

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: email,
    pass: password
  }
});

export default async function sendEmail(toEmail, subject, content) {
  try {
    // Check if the email address is not empty
    if (!toEmail || !toEmail.trim()) {
      console.error('Invalid email address');
      return;
    }

    // Email is not empty, proceed to send the email
    const mailOptions = {
      from: email, // Sender's email address
      to: toEmail, // Recipient's email address
      subject: subject,
      text: content,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

