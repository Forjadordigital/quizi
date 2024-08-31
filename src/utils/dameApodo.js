export function obtenerUsuarioDesdeLocalStorage() {
    // Verificar si la localStorage está disponible en el navegador
    if (typeof localStorage !== 'undefined') {
      // Obtener el apodo almacenado
      const apodo = localStorage.getItem('apodo');
      // Obtener el tiempo almacenado
      const tiempo = localStorage.getItem('tiempo');
  
      // Crear un objeto "usuario" con los valores obtenidos
      const usuario = {
        apodo: apodo,
        tiempo: tiempo
      };
  
      // Retornar el objeto "usuario"
      return usuario;
    } else {
      console.log('La localStorage no está disponible en este navegador.');
      return null; // O manejar el caso de error según tus necesidades
    }
  }
  
  // Ejemplo de uso:
//   const miUsuario = obtenerUsuarioDesdeLocalStorage();
//   if (miUsuario) {
//     console.log('Apodo:', miUsuario.apodo);
//     console.log('Tiempo:', miUsuario.tiempo);
//   } else {
//     console.log('No se pudo obtener el usuario desde la localStorage.');
//   }
  