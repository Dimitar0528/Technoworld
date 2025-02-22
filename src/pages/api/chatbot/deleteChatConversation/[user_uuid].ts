import Chatbot_Message  from 'db/models/Chatbot_Message';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const userUUID = params.user_uuid;
    // Use Sequelize to find and delete the product by ID
    const deletedConversation = await Chatbot_Message.destroy({
      where: { user_uuid: userUUID },
    });

    if (deletedConversation) {
      return new Response(JSON.stringify({message: "You have sucessfully deleted your conversation!"}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
    } else {
      return new Response(JSON.stringify({ error: 'Chat conversation not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}