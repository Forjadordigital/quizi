import { useState } from 'preact/hooks';

function RegistroApodo() {
  const [apodo, setApodo] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [inputClass, setInputClass] = useState('border-gray-300');
  const [mensajeClass, setMensajeClass] = useState('gray-300')

  const handleApodoChange = (e) => {
    setApodo(e.target.value);
  };

  const validarApodo = async () => {
    try {
      const response = await fetch(`/api/apodos?apodo=${encodeURIComponent(apodo)}`);
      const data = await response.json();

      if (data.status === 'repeated') {
        setMensajeError('El apodo ya existe. Selecciona otro.');
        setInputClass('border-red-500');
        setMensajeClass('text-red-900 bg-red-500/40')
      } else if (data.status === 'vacio') {
        setMensajeError('El apodo no puede estar vacío.');
        setInputClass('border-red-500');
        setMensajeClass('text-red-900 bg-red-500/40')
      } else if (data.status === 'success') {
        setMensajeError('Apodo válido.');
        setInputClass('border-green-500');
        setMensajeClass('bg-green-500/50 text-teal-300')
        localStorage.setItem('apodo', apodo);
        setTimeout(() => {
          window.location.href = '/instrucciones';
        }, 1000);
      }
    } catch (error) {
      console.error('Error al validar el apodo:', error);
      setMensajeError('Error al validar el apodo.');
      setInputClass('border-red-500');
    }
  };

  const handleClick = () => {
    console
    validarApodo();
  };

  return (
    <div class="w-11/12 mt-6 ">
      <div class="relative mb-2 ">
        <input
          type="text"
          value={apodo}
          onChange={handleApodoChange}
          id="floating_filled"
          class={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-2 ${inputClass} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          placeholder=" "
        />
        <label
          for="floating_filled"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Escribe tu <span class="font-bold">Apodo</span>
        </label>
      </div>
      {mensajeError && <span class={`text-sm block p-2 rounded-lg font-medium ${mensajeClass}`}>{mensajeError}</span>}
      <button
        type="button"
        onClick={handleClick}
        class="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg mt-6 active:bg-pink-700"
      >
        Continuar
      </button>
    </div>
  );
}

export default RegistroApodo;
