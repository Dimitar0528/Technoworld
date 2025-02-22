// Import Sequelize models and necessary modules
import Chatbot_Message from 'db/models/Chatbot_Message.ts';
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
    const messageUUID = params.botMessageUUID;
    await Chatbot_Message.destroy({ where: { message_uuid: messageUUID } });
        
        return new Response(null,
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        }