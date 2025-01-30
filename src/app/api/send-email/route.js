import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { emails } = await req.json();

  if (!emails || emails.length === 0) {
    return NextResponse.json(
      { message: "No emails provided" },
      { status: 400 }
    );
  }

  const credentials = {
    email: "sangamdalal24@gmail.com",
    password: "skox qwjl nxzy crdl",
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.email,
      pass: credentials.password,
    },
  });

  const sendEmail = (email) => {
    const mailOptions = {
      from: credentials.email,
      to: email,
      subject: "Seeking Job Opportunity as a Node.js Developer",
      text: "Seeking Job Opportunity as a Node.js Developer",
      html: `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        h1 {
            font-size: 18px;
            color: #333;
        }
        p {
            font-size: 16px;
            margin: 10px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="email-container">
    <p>Dear Pooja,</p>

    <p>I hope this email finds you well.</p>

    <p>I am a <strong>Node Js Backend Developer</strong> with <strong>1 years of experience</strong> and am currently exploring new opportunities. I would love to know if there are any suitable openings for my profile at your organization.</p>

    <p>Please find my resume attached for your reference. I’d be happy to discuss further and provide any additional details if needed.</p>

    <p>Looking forward to hearing from you.</p>

    <p>Best regards,</p>
    <p><strong>Atharv Dalal</strong><br>
    📧 sangamdalal24@gmail.com<br>
    📞 +91 9225592220<br>
    💼 <a href="https://www.linkedin.com/in/atharv-dalal/" target="_blank">LinkedIn Profile</a></p>


</div>

</body>
</html>`,
      attachments: [
        {
          filename: "AtharvDalal_Resume.pdf",
          path: "./public/AtharvDalal_Resume.pdf",
          contentType: "application/pdf",
        },
      ],
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(`Error sending to ${email}:`, err);
            resolve({ email, success: false });
          } else {
            console.log(`Email sent to ${email}`);
            resolve({ email, success: true });
          }
        });
      }, 1000);
    });
  };

  // Send emails sequentially with a delay
  for (let i = 0; i < emails.length; i++) {
    await sendEmail(emails[i]);
  }

  return NextResponse.json(
    { message: "Emails sent successfully!" },
    { status: 200 }
  );
}
