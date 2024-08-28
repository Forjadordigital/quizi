import { type APIRoute } from 'astro';
import { createClient } from '@libsql/client';

export const GET: APIRoute = async () => {
  const client = createClient({
    url: import.meta.env.PUBLIC_DATABASE_URL ?? '',
    authToken: import.meta.env.DATABASE_AUTH_TOKEN ?? ''
  });

  try {
    const query = `
      SELECT * from resultados
    `;
    const result = await client.execute(query);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
