import { type APIRoute } from 'astro';
import { createClient } from '@libsql/client';

export const GET: APIRoute = async ({ request }) => {
  try {
    const client = createClient({
      url: import.meta.env.PUBLIC_DATABASE_URL ?? '',
      authToken: import.meta.env.DATABASE_AUTH_TOKEN ?? ''
    });

    const { url } = request;
    const searchParams = new URL(url).searchParams;
    const apodo = searchParams.get('apodo');

    // Consulta para verificar si el apodo está repetido
    const query = `
      SELECT COUNT(*) AS count
      FROM resultados
      WHERE apodo = ?;
    `;

    const result = await client.execute({
      sql: query,
      args: [apodo]
    });

    const rowCount = result.rows[0]?.count || 0;

    if (rowCount as number > 0) {
      // El apodo está repetido
      return new Response(JSON.stringify({
        status: 'repeated',
        message: 'El apodo ya existe en la base de datos'
      }), {
        status: 400, // Bad Request
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // El apodo no está repetido, puedes continuar con la consulta original
    // ...

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
