// Import the User model and other necessary dependencies
import User from 'db/models/User.js';
import type { APIRoute } from 'astro';

export const GetUser: APIRoute = async ({ params },) => {
  const userId = params.user_uuid;
    // Use Sequelize to find the user by UUID
    const user = await User.findOne({
      where: { uuid: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
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
};
export const getUser = async (user_uuid) => {
    const user = await User.findOne({
      where: { uuid: user_uuid },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
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
};