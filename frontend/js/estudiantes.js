const API_ESTUDIANTES = 'http://127.0.0.1:8000/api/estudiantes/';
const API_CURSOS = 'http://127.0.0.1:8000/api/cursos/';

document.addEventListener('DOMContentLoaded', () => {
    obtenerEstudiantes();
    cargarCursosEnSelect();
});

// Cargar opciones de cursos
function cargarCursosEnSelect() {
    fetch(API_CURSOS)
        .then(response => response.json())
        .then(cursos => {
            const selectCurso = document.getElementById('curso');
            selectCurso.innerHTML = '<option value="">-- Selecciona un Curso --</option>';
            
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.id;
                option.textContent = `${curso.nombre} (${curso.codigo})`;
                selectCurso.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar la lista de cursos:', error));
}

// GET: Obtener y listar estudiantes
function obtenerEstudiantes() {
    fetch(API_ESTUDIANTES)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-estudiantes');
            tbody.innerHTML = '';
            data.forEach(estudiante => {
                tbody.innerHTML += `
                    <tr>
                        <td>${estudiante.id}</td>
                        <td>${estudiante.nombre}</td>
                        <td>${estudiante.apellido}</td>
                        <td>${estudiante.grado}</td>
                        <td>${estudiante.curso}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al cargar estudiantes:', error));
}

// POST: Registrar estudiante
document.getElementById('form-estudiante').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoEstudiante = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        grado: document.getElementById('grado').value,
        curso: parseInt(document.getElementById('curso').value)
    };

    fetch(API_ESTUDIANTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEstudiante)
    })
    .then(async response => {
        if (!response.ok) {
            const errorDetalle = await response.json();
            throw new Error(JSON.stringify(errorDetalle));
        }
        return response.json();
    })
    .then(() => {
        document.getElementById('form-estudiante').reset();
        obtenerEstudiantes();
    })
    .catch(error => alert('Error al guardar: ' + error.message));
});