import { useEffect, useState } from 'preact/hooks';
import TiempoFormato from './TiempoFormato';

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:4321/api/preguntas');
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        console.log(data)
        setCategorias(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategorias();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categorias.length) {
    return <div>Cargando categorías...</div>;
  }

  console.log(categorias)

  return (
    <ul>
      {categorias.map((categoria) => (
        <li key={categoria.id}>{categoria.apodo} hizo un tiempo de <TiempoFormato segundos={categoria.tiempo} /></li>
      ))}
    </ul>
  );
};

export default CategoriasList;
