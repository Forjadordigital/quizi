// /src/pages/api/tiempos.ts
import { type APIRoute } from 'astro';
import { getClient } from '../../db/db';

export const GET: APIRoute = async () => {
  try {
    const client = getClient();

    const query = `
      SELECT apodo, tiempo 
      FROM resultados 
      WHERE tiempo > 0 
      ORDER BY tiempo ASC;
    `;

    const { rows } = await client.execute(query);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al obtener los tiempos:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
