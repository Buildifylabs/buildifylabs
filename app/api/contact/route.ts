import { NextResponse } from 'next/server'
import nodeMailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function POST(request: Request) {
    console.log(request.body)
  try {
    const {firstName, lastName, email, subject, message, service, date, time, notes, type  } = await request.json();
    // console.log(request.json())

    // Email content based on form type
    const emailContent =
      date !== undefined
        ? `
        <h2>New Consultation Booking</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Notes:</strong> ${notes || "None"}</p>
      `
        : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `

    const transporter = nodeMailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: `${process.env.SMPT_NAME}`,
      to: process.env.SMPT_EMAIL,
      subject: type === "booking" ? `New Consultation Booking - ${firstName} ${lastName}` : `Contact Form: ${subject}`,
      text: 'Email from buildifylabs',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}