// Import Sequelize models and necessary modules
import Chatbot_Message from 'db/models/Chatbot_Message.ts';
import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ request, params }) => {
    const messageUUID = params.message_uuid;

    try {
        // Fetch the existing chat message
        const chatMessage = await Chatbot_Message.findOne({ where: { message_uuid: messageUUID } });

        if (!chatMessage) {
            return new Response(
                JSON.stringify({ error: 'Chat message not found' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Parse the incoming JSON data from the request body
        const { userMessage } = await request.json();

        // Update the chat message content
        await chatMessage.update({ message_content: userMessage });

        return new Response(
            JSON.stringify({ message: 'Chat message updated successfully!' }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error updating chat message:', error);

        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
