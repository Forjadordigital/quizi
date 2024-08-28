import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    return new Response ("Hello World")

    try{
        const { respuestas } = await request.json()
    }
    catch(e){
        return new Response('Bad Request', { status: 400 })
    }
}