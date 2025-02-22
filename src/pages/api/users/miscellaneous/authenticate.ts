import User  from 'db/models/User.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = import.meta.env.JWT_SECRET_KEY! as string
export const POST = async ({ request }) => {
    const { username, password } = await request.json();

    // Find the user by username in the database
    const user: User | null = await User.findOne({
      where: { username },
    });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials! Please check them again.' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json', 
        }, 
      });
    }
    if(username !== user.username){
      return new Response(JSON.stringify({ error: 'Invalid username! Please check your username again.' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid password! Please check your password again.' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Create a token for the authenticated user
    const token = jwt.sign({ userUUID: user.uuid, userRole: user.role }, secretKey, {
      expiresIn: '24h',
    }); 
    // Set the token as a cookie with an expiration time
    let cookie = `_jwt=${token}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict; Path=/`;
    let isLoggedIn: boolean = true;
    if(username !== '') isLoggedIn = true;
    const responseData = {
      isLoggedIn: isLoggedIn,
      user_uuid: user.uuid,
    }
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
};
