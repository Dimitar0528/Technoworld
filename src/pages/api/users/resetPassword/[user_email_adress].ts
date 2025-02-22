
import  User  from 'db/models/User.ts';
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';

export const PUT: APIRoute = async ({ request, params }) => {
    const userEmail = params.user_email_adress;

    const password  = await request.json();

    const user = await User.findOne({ where: { email_adress: userEmail } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
     // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return new Response(JSON.stringify({ error: 'The new password cannot be the same as the old one!' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   await User.update({
  password: hashedPassword
},
 { where : {
  uuid: user.uuid,
}
});
    
    return new Response(
      JSON.stringify({ message: 'Password reset successfully!' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
};
