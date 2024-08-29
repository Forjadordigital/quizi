// apodos.ts
import { type APIRoute } from 'astro';
import { getClient } from '../../db/db';
import { isApodoRepeated } from '../../utils/validation';

export const GET: APIRoute = async ({ request }) => {
  try {
    const client = getClient();

    const { url } = request;
    const searchParams = new URL(url).searchParams;
    const apodo = searchParams.get('apodo');

    if (apodo === "") {
        return new Response(JSON.stringify({ status: 'vacio', message: 'No se puede participar sin apodo' }))
      }

    const query = `
      SELECT COUNT(*) AS count
      FROM resultados
      WHERE apodo = ?;
    `;

    const result = await client.execute({
      sql: query,
      args: [apodo]
    });

    if (isApodoRepeated(result.rows[0]?.count)) {
      return new Response(JSON.stringify({
        status: 'repeated',
        message: 'El apodo ya existe en la base de datos'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } 
    // El apodo no está repetido, puedes continuar con la consulta original
    // ...
    const queryInsert = `
        INSERT INTO resultados (apodo, tiempo) VALUES (?, ?);
    `;

    await client.execute({
        sql: queryInsert,
        args: [apodo, 0]
    });


   // Devolvemos un mensaje de éxito
   return new Response(JSON.stringify({
    status: 'success',
    message: 'Gracias por el registro, ¡qué buen apodo!'
  }), {
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
