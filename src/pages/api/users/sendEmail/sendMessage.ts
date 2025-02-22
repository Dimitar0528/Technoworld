import  User  from 'db/models/User.ts';
import sgMail from '@sendgrid/mail'

export const POST = async ({ request }) => {
  const {email,message,userRole} = await request.json();
   const user = await User.findOne({ where: { email_adress: email } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User with this email adress not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

  sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);
  const msg = {
    to: userRole === 'user' ? import.meta.env.SENDER_EMAIL : email,
    from: userRole === 'user'? email : import.meta.env.SENDER_EMAIL ,
    subject:  userRole === 'user' ? 'Contact Us User Message Received' : 'Your purchase has been completed successfully',
    html: `${message}.`,
  };
await sgMail.send(msg);
return new Response(JSON.stringify({ message: 'Successfully send your message!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}