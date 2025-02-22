// Import the User model and other necessary dependencies
import User from 'db/models/User.js';

export const POST = async ({ request }) => {
  const { userEmail }= await request.json();

  try {
    const user = await User.findOne({
      where: { email_adress: userEmail },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User with this email adress not found. Please enter it again!' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
