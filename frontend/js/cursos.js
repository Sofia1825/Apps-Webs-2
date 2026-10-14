const API_URL = 'http://127.0.0.1:8000/api/cursos/';

// Cargar datos al abrir la página
document.addEventListener('DOMContentLoaded', obtenerCursos);

// GET: Traer los cursos y pintarlos en la tabla
function obtenerCursos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-cursos');
            tbody.innerHTML = '';
            data.forEach(curso => {
                tbody.innerHTML += `
                    <tr>
                        <td>${curso.id}</td>
                        <td>${curso.nombre}</td>
                        <td>${curso.codigo}</td>
                        <td>${curso.profesor}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener cursos:', error));
}

// POST: Crear un curso nuevo
document.getElementById('form-curso').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoCurso = {
        nombre: document.getElementById('nombre').value,
        codigo: document.getElementById('codigo').value,
        profesor: parseInt(document.getElementById('profesor').value)
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCurso)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en el registro');
        return response.json();
    })
    .then(() => {
        document.getElementById('form-curso').reset();
        obtenerCursos(); // Actualiza la tabla sin recargar la página
    })
    .catch(error => alert('Error al guardar el curso: ' + error.message));
});