import nodemailer from 'nodemailer';

export async function sendVerificationEmail({ email, name, verificationLink }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"PulsePoint" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `
      <h2>Hello ${name}</h2>
      <p>Click below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `
  });
}
