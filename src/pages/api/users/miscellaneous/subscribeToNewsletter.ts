import User from "db/models/User.ts";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const POST = async ({ request }) => {
  const user: User = await request.json();
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  let { is_subscribed_to_newsletter } = user;
  is_subscribed_to_newsletter = true;
  await User.update(
    {
      is_subscribed_to_newsletter: is_subscribed_to_newsletter,
    },
    {
      where: {
        uuid: user.uuid,
      },
    }
  );
  if (user.is_subscribed_to_newsletter === true) {
    return new Response(
      JSON.stringify({
        message: "You have already subscribed for our newsletter!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );
  }
  let newsletterMessage = {
    from: {
      email: import.meta.env.SENDER_EMAIL,
    },
    personalizations: [
      {
        to: [
          {
            email: user.email_adress,
          },
        ],
        dynamic_template_data: {
          name: user.first_name !== null ? user.first_name : user.username,
        },
      },
    ],
    template_id: "d-46107e27cf164c13a03b4e745484950e",
  }; //@ts-ignore
  await sgMail.send(newsletterMessage);

  return new Response(
    JSON.stringify({
      message:
        "Congratulations! You have successfully subscribed to our newsletter! Find it out by checking your email adress.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
