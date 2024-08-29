// tiempo.ts
import { type APIRoute } from 'astro';
import { getClient } from '../../db/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const client = getClient();

    // Obtén los datos necesarios para la actualización (por ejemplo, nuevo tiempo)
    const { url } = request;
    const searchParams = new URL(url).searchParams;
    const apodo = searchParams.get('apodo');
    const nuevoTiempo = searchParams.get('nuevoTiempo');

    // Consulta para actualizar el tiempo
    const queryUpdate = `
      UPDATE resultados
      SET tiempo = ?
      WHERE apodo = ?;
    `;

    await client.execute({
      sql: queryUpdate,
      args: [nuevoTiempo, apodo] // Ajusta los valores según tus necesidades
    });

    return new Response('Tiempo actualizado correctamente', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error al actualizar el tiempo', { status: 500 });
  }
};
