import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_SERVER_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
};

// Send contact form email to admin
export const sendContactNotification = async (formData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: process.env.ADMIN_EMAIL || "madwaithmadhiraju886@gmail.com", // Your email
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
              ${formData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from the GEE INNOVIXUS website contact form.
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Email notification error:", error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to user
export const sendAutoReply = async (formData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: formData.email,
      subject: "Thank you for contacting GEE INNOVIXUS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">GEE INNOVIXUS</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Engineering Excellence</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1e40af; margin-top: 0;">Thank you for your inquiry!</h2>
            
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for reaching out to GEE INNOVIXUS. We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0;">Your Message:</h3>
              <p style="color: #374151; font-style: italic;">
                "${formData.message}"
              </p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul style="color: #374151;">
              <li>Visit our <a href="${
                process.env.NEXTAUTH_URL
              }/projects" style="color: #2563eb;">Projects Portfolio</a></li>
              <li>Check out our <a href="${
                process.env.NEXTAUTH_URL
              }/services" style="color: #2563eb;">Engineering Services</a></li>
              <li>Contact us directly on <a href="https://wa.me/${process.env.WHATSAPP_NUMBER?.replace(
                "+",
                ""
              )}" style="color: #25d366;">WhatsApp</a> for immediate assistance</li>
            </ul>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="color: #1e40af; margin-top: 0;">Quick Contact</h3>
              <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/${process.env.WHATSAPP_NUMBER?.replace(
                "+",
                ""
              )}" style="color: #25d366;">${process.env.WHATSAPP_NUMBER}</a></p>
              <p style="margin: 5px 0;"><strong>Email:</strong> info@geeinnovixus.com</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> 18-78/A, FLAT NO 304, KAMALA NIVAS, NEAR METRO PILLAR NO 1558, SAROORNAGAR, DILSUKHNAGAR, HYDERABAD–500060, TELANGANA, INDIA</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Best regards,<br>
              <strong>GEE INNOVIXUS Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Auto-reply email error:", error);
    return { success: false, error: error.message };
  }
};
