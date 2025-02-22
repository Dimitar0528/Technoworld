import sharp from 'sharp'
import fetch from 'node-fetch';
import type { APIRoute } from 'astro';

interface ImageUrls {
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
}

export const POST: APIRoute = async ({ request }) => {
    const { imageUrls }: { imageUrls: ImageUrls } = await request.json();

    const convertedImages: Record<string, string> = {};

    // Process each image URL
    for (const key of Object.keys(imageUrls)) {
      const imageUrl = imageUrls[key];

      // Check if the image URL ends with .jpg, .jpeg, .png, or .webp
      if (imageUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);

        // Check if the fetch was successful
        if (!response.ok) {
          throw new Error(`Failed to fetch the image: ${imageUrl}`);
        }

        // Convert the image to AVIF format without saving it to the file system
        const avifBuffer = await sharp(await response.arrayBuffer())
          .toFormat('avif')
          .toBuffer();

        // Store the converted image URL in the result object
        convertedImages[key] = `data:image/avif;base64,${avifBuffer.toString('base64')}`;
      } else {
        // Invalid image format, return error for this image
        return new Response(
          JSON.stringify({ error: `Invalid image format for ${key}. Only JPG, JPEG, PNG, and WebP formats are supported.` }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // Return the converted image URLs as JSON response
    return new Response(JSON.stringify({ convertedImages }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
};
