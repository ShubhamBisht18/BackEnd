import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Vastrify 👕" <${process.env.EMAIL_ID}>`,
      to,
      subject,
      text,
      replyTo: "support@vastrify.com", // ✅ add here
      headers: {
        "X-Mailer": "NodeMailer",      // ✅ and here
      },
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px; color: #333;">
          <h2>Welcome to Vastrify</h2>
          <p>Your One Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 3px;">${text.match(/\d{6}/)?.[0]}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <br />
          <p>If you didn’t request this, please ignore this email.</p>
          <br />
          <p>Thanks,<br/>The Vastrify Team</p>
        </div>
      `,
    });

    console.log("✅ OTP email sent to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    throw new Error("Email sending failed");
  }
};

