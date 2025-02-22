import User from "db/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secretKey = import.meta.env.JWT_SECRET_KEY! as string;

const generateAndSendResponse = async (
  user: User,
  isLoggedIn: boolean,
  message?: string
): Promise<Response> => {
  const token = jwt.sign(
    { userUUID: user.uuid, userRole: user.role },
    secretKey,
    {
      expiresIn: "24h",
    }
  );

  const cookie = `_jwt=${token}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict; Path=/`;

  const responseData = {
    isLoggedIn,
    user_uuid: user.uuid,
    message,
  };

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
  });
};

export const POST = async ({ request }) => {
  const { jwtToken } = await request.json();
  const decoded = jwt.decode(jwtToken);
  const email_adress = decoded!["email"];
  const first_name = decoded!["given_name"];
  const last_name = decoded!["family_name"];

  const user = await User.findOne({
    where: { email_adress },
  });

  if (user) return generateAndSendResponse(user, true);

  const hashedPassword = await bcrypt.hash("DefaultPass123!", 10);
  function generateRandomUsername(prefix = "user") {
    const uniqueId = Date.now(); // Using timestamp as a simple unique identifier
    const username = `${prefix}_${uniqueId}`;
    return username;
  }

  // Create a new user in the database
  const newUser = await User.create({
    uuid: crypto.randomUUID(),
    username: generateRandomUsername(),
    email_adress,
    password: hashedPassword,
    role: "user",
    first_name: first_name,
    last_name: last_name,
  });

  return generateAndSendResponse(
    newUser,
    true,
    "Because you created your account via Google and only provided an email address, we have given you a temporary password. You should change it as soon as possible by clicking on the Account Link on the Home Page!"
  );
};
