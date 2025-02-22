
import  User  from 'db/models/User.ts';
import type { APIRoute } from 'astro';
export const PUT: APIRoute = async ({ request, params }) => {
    const userUUID = params.user_uuid;

    const {username, first_name,last_name, email_adress, phone_number, gender } = await request.json();
    const user = await User.findOne({ where: { uuid: userUUID } });
  
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
   // Check if the new username is already taken by another user
  const existingUserWithUsername = await User.findOne({ where: { username } });
  if (existingUserWithUsername && existingUserWithUsername.uuid !== userUUID) {
    return new Response(
      JSON.stringify({ error: 'Username is already taken! Please enter a new one!' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
    // Check if an admin user already exists
    const adminUser = await User.findOne({ where: { role: 'admin' } });

    if (username.toLowerCase().includes('admin') && adminUser && adminUser.uuid !== userUUID) {
        return new Response(JSON.stringify({ error: 'Request denied! Your username should not include the word admin!' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

 await User.update({
   username: username,
   first_name: first_name,
   last_name: last_name,
   email_adress: email_adress,
   phone_number: phone_number,
   gender: gender,
  },
    {where : {
        uuid: user.uuid,
  }
});

    return new Response(
      JSON.stringify({ message: 'Account details updated successfully!' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
};
