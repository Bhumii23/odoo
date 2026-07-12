import nodemailer from 'nodemailer';

const user = process.env.MAILTRAP_USER;
const pass = process.env.MAILTRAP_PASS;

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: user || '',
    pass: pass || ''
  }
});

export const sendPasswordResetEmail = async (toEmail: string, resetToken: string) => {
  // In a real app, this would be an environment variable (e.g. process.env.FRONTEND_URL)
  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: '"TransitOps Admin" <admin@transitops.com>',
    to: toEmail,
    subject: "TransitOps - Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}\n\nIf you did not request this, please ignore this email.`,
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your TransitOps account.</p>
      <p>Click the link below to securely reset your password. This link will expire in 1 hour.</p>
      <a href="${resetLink}">Reset Password</a>
      <p><br>If you did not request this, please ignore this email.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent via Mailtrap: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send password reset email", error);
  }
};
