import type { APIRoute } from "astro";
import Chatbot_Message  from 'db/models/Chatbot_Message';

export const POST: APIRoute = async ({ request }) => {
 const {message_uuid, message, type,user_uuid }: { message_uuid:string, message:string, type:string, user_uuid:string} = await request.json();
     const newChatMessage = await Chatbot_Message.create({message_uuid:message_uuid, message_content: message,
      is_user_message: type === 'outgoing',
      user_uuid, });

return new Response(JSON.stringify(newChatMessage), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
};
