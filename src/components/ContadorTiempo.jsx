import { useState, useEffect } from 'preact/hooks';

function ContadorTiempo({ tiempoInicial = 0, contando = false, onCambio }) {
  const [segundos, setSegundos] = useState(tiempoInicial);
  const [activo, setActivo] = useState(contando);

  useEffect(() => {
    let intervalo = null;

    if (activo) {
      intervalo = setInterval(() => {
        setSegundos(prevSegundos => {
          const nuevoTiempo = prevSegundos + 1;
          if (onCambio) onCambio(nuevoTiempo);
          return nuevoTiempo;
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo]);

  useEffect(() => {
    setActivo(contando);
  }, [contando]);

  useEffect(() => {
    setSegundos(tiempoInicial);
  }, [tiempoInicial]);

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  const minutosFormateados = minutos.toString().padStart(2, '0');
  const segundosFormateados = segundosRestantes.toString().padStart(2, '0');

  return (
    <div>
      <div>
        Tiempo: {minutosFormateados}:{segundosFormateados}
      </div>
    </div>
  );
}

export default ContadorTiempo;
