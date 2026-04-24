import nodemailer from 'nodemailer';

export async function sendVerificationEmail({ email, name, verificationLink }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"PulsePoint Pharmacy Locator" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `
      <div style="font-family:Arial; padding:20px;">
        <h2>Hello ${name}</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${verificationLink}" style="padding:10px 15px;background:#2563eb;color:white;text-decoration:none;border-radius:5px;">
          Verify Email
        </a>
        <p>If button doesn't work, use this link:</p>
        <p>${verificationLink}</p>
      </div>
    `
  });
}
