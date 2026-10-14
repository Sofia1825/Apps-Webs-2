const API_URL = 'http://127.0.0.1:8000/api/profesores/';

// Ejecutar apenas cargue la página
document.addEventListener('DOMContentLoaded', obtenerProfesores);

// 1. FETCH (GET) - Obtener y listar los profesores en la tabla
function obtenerProfesores() {
    fetch(API_URL)
        .then(response => response.json())
        .then(profesores => {
            const tbody = document.getElementById('tabla-profesores');
            tbody.innerHTML = ''; // Limpiar la tabla antes de rellenar

            profesores.forEach(profesor => {
                tbody.innerHTML += `
                    <tr>
                        <td>${profesor.id}</td>
                        <td>${profesor.nombre}</td>
                        <td>${profesor.apellido}</td>
                        <td>${profesor.especialidad}</td>
                        <td>${profesor.email}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener profesores:', error));
}

// 2. FETCH (POST) - Registrar un nuevo profesor desde el formulario
document.getElementById('form-profesor').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que la página se recargue

    // Capturar los valores de los inputs
    const datosProfesor = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        especialidad: document.getElementById('especialidad').value,
        email: document.getElementById('email').value
    };

    // Enviar los datos al backend con POST
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosProfesor)
    })
    .then(response => {
        if (response.ok) {
            alert('Profesor registrado con éxito');
            document.getElementById('form-profesor').reset(); // Limpiar formulario
            obtenerProfesores(); // Recargar la tabla automáticamente
        } else {
            alert('Error al registrar el profesor. Verifica los datos.');
        }
    })
    .catch(error => console.error('Error en el registro:', error));
});

