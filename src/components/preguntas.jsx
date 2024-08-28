import { useState, useEffect } from 'preact/hooks';

export function PreguntasPorCategoria({ categoriaId }) {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);

  const obtenerPreguntas = async () => {
    try {
      const response = await fetch('/api/preguntas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoriaId })
      });

      if (!response.ok) {
        throw new Error('Error al obtener las preguntas');
      }

      const data = await response.json();
      setPreguntas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    obtenerPreguntas();
  }, [categoriaId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {preguntas.map((pregunta) => (
        <li key={pregunta.id}>{pregunta.texto}</li>
      ))}
    </ul>
  );
}

