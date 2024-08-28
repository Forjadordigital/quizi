
function TiempoFormato({ segundos }) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  // Formatea minutos y segundos para que siempre tengan dos dígitos
  const minutosFormateados = minutos.toString().padStart(2, '0');
  const segundosFormateados = segundosRestantes.toString().padStart(2, '0');

  return (
    <div>
      {minutosFormateados}:{segundosFormateados}
    </div>
  );
}

export default TiempoFormato;
