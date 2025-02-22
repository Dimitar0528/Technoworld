// Import the User model and other necessary dependencies
import sgMail from "@sendgrid/mail";

export const POST = async ({ request }) => {
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  const { email } = await request.json();
  const otp = generateOTP();
  sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: import.meta.env.SENDER_EMAIL,
    subject: "OTP Verification",
    html: `<p> Your OTP for verification is: <strong>${otp} </strong> </p>.`,
  };
  await sgMail.send(msg);
  return new Response(JSON.stringify(otp), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
