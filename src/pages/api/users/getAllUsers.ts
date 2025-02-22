import User from 'db/models/User.ts';
export async function GetAllUsers() {
    const users = await User.findAll({ where: { role: 'user' }});
    if (!users) {
      return new Response(JSON.stringify({ error: 'Users not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(
      JSON.stringify(users), {
        status: 200,
          headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
