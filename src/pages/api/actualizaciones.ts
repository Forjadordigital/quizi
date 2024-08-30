import { type APIRoute } from "astro";
import { getClient } from "../../db/db";

export const GET: APIRoute = async ({ request }) => {
    try {
        const client = getClient();
        const { url } = request;
        const searchParams = new URL(url).searchParams;
        const apodo = searchParams.get('apodo');
        const nuevoTiempo = searchParams.get('tiempo');

        if (!apodo || !nuevoTiempo) {
            return new Response(JSON.stringify({
                status: 'error',
                message: 'Los parámetros "apodo" y "nuevoTiempo" son obligatorios.'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const queryUpdate = `
            UPDATE resultados
            SET tiempo = ?
            WHERE apodo = ?;
        `;

        try {
            await client.execute({
                sql: queryUpdate,
                args: [nuevoTiempo, apodo]
            });

            return new Response(JSON.stringify({
                status: 'success',
                message: 'Tiempo actualizado correctamente'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.error('Error: ', error);
            return new Response(JSON.stringify({
                status: 500,
                message: 'Error al actualizar el tiempo'
            }));
        }

    } catch (error) {
        console.error('Error: ', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
