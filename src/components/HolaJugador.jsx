import { useEffect, useState } from 'preact/hooks';

function Instrucciones() {
  const [apodo, setApodo] = useState('');

  useEffect(() => {
    // Acceder al localStorage desde el navegador
    const apodoGuardado = localStorage.getItem('apodo');
    if (apodoGuardado) {
      setApodo(apodoGuardado);
    } else {
      // Redirigir si no hay apodo guardado
      window.location.href = '/registro';
    }
  }, []);

  return (
    <div className="">
        <span className="font-medium text-2xl block text-center">¡Bienvenido!</span>
        <h2 className="font-bold text-4xl text-center">{apodo}</h2>
        <div className="mt-12">
            <h3 className="text-start font-semibold text-3xl ">
                Instrucciones
            </h3>
            <p className="mt-2 text-lg">
                <span className="font-semibold">¡La velocidad es clave!</span> Cuando des clic en <span className="font-semibold">"Comenzar"</span>, el tiempo empezará a correr. Tendrás que ser rápido y preciso para seleccionar la respuesta correcta entre las opciones <span className="font-semibold">A, B, C y D</span>. ¡Cada segundo cuenta! Los aciertos te llevarán a la siguiente pregunta, pero los errores te harán perder valioso tiempo. ¿Te atreves a poner a prueba tus reflejos?

                <span className="text-xl block mt-2 font-semibold">Mucha suerte, {apodo}</span>
            </p>
        </div>
    </div>
  );
}

export default Instrucciones;