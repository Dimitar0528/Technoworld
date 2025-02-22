import User from 'db/models/User.ts';
import bcrypt from 'bcryptjs';
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const { username, email, password }: { username:string,email:string,password:string } = await request.json();

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
        return new Response(JSON.stringify({ error: 'Username already taken!' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Check if an admin user already exists
    const adminUser = await User.findOne({ where: { role: 'admin' } });

    if (username.toLowerCase().includes('admin') && adminUser) {
        return new Response(JSON.stringify({ error: 'Request denied! You cannot create administator accounts!' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const role: 'user' | 'admin'  = username.toLowerCase().includes('admin') ? 'admin' : 'user';
    // Create a new user in the database
    const newUser = await User.create({
        uuid: crypto.randomUUID(),
        username: username,
        email_adress: email,
        password: hashedPassword,
        role: role,
    });

    return new Response(JSON.stringify(newUser), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
    });
};
