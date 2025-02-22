import type { APIRoute } from "astro";
import Chatbot_Message  from 'db/models/Chatbot_Message';
export const GET: APIRoute = async ({ params }) => {
    const userUUID = params.user_uuid;
    const chatMessages = await Chatbot_Message.findAll({
      where: { user_uuid : userUUID },
      order: [['createdAt', 'ASC']],
    });

return new Response(
      JSON.stringify(chatMessages), {
        status: 200,
          headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
      