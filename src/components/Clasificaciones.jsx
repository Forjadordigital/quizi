import { useEffect, useState } from 'preact/hooks';
import TiempoTabla from './TiempoTabla';

const Clasificaciones = () => {
  const [tiempos, setTiempos] = useState([]);

  const fetchTiempos = async () => {
    try {
      const response = await fetch('/api/tiempos');
      if (response.ok) {
        const data = await response.json();
        setTiempos(data);
      } else {
        console.error('Error al obtener los tiempos:', await response.text());
      }
    } catch (error) {
      console.error('Error al obtener los tiempos:', error);
    }
  };

  useEffect(() => {
    fetchTiempos();
    const intervalId = setInterval(fetchTiempos, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonte el componente
  }, []);

  const getRowClass = (index) => {
    if (index === 0) return 'bg-yellow-400';
    if (index === 1) return 'bg-gray-700';
    if (index === 2) return 'bg-red-600';
    return index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'; // Alternar color de fondo para otros lugares
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full bg-slate-800 text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 ext-gray-400">
          <tr class="bg-slate-900 border-b">
            <th scope="col" className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">Posición</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">Apodo</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">Tiempo (ms)</th>
          </tr>
        </thead>
        <tbody>
          {tiempos.map((tiempo, index) => (
            <tr key={index} className={`${getRowClass(index)} border-b border-gray-700`}>
              <td className="border font-semibold text-gray-200 border-slate-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border font-semibold text-gray-200 border-slate-300 px-4 py-2">{tiempo.apodo}</td>
              <td className="border text-gray-200 border-slate-300 px-4 py-2 text-right"><TiempoTabla milisegundos={tiempo.tiempo}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clasificaciones;
