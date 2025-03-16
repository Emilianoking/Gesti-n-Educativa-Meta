document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado, iniciando carga de datos'); // Para depurar

    // Verificar que las pestañas estén cargadas
    const municipiosTab = document.getElementById('municipios-tab');
    const municipiosPane = document.getElementById('municipios');
    if (!municipiosTab || !municipiosPane) {
        console.error('Pestaña o contenido de municipios no encontrado');
        return;
    }

    // Cargar datos al iniciar
    cargarMunicipios();
    cargarTablaMunicipios();
    cargarColegios();

    // Evento de búsqueda para municipios
    const btnBuscarMunicipio = document.getElementById('btnBuscarMunicipio');
    if (btnBuscarMunicipio) {
        btnBuscarMunicipio.addEventListener('click', function () {
            const buscar = document.getElementById('buscar_municipio').value;
            buscarMunicipios(buscar);
        });
    } else {
        console.error('Botón de búsqueda de municipios no encontrado');
    }

    // Evento de búsqueda para colegios
    const btnBuscarColegio = document.getElementById('btnBuscarColegio');
    if (btnBuscarColegio) {
        btnBuscarColegio.addEventListener('click', function () {
            const buscar = document.getElementById('buscar_colegio').value;
            buscarColegios(buscar);
        });
    } else {
        console.error('Botón de búsqueda de colegios no encontrado');
    }

    // Evento de búsqueda para sedes
    const btnBuscarSede = document.getElementById('btnBuscarSede');
    if (btnBuscarSede) {
        btnBuscarSede.addEventListener('click', function () {
            const buscar = document.getElementById('buscar_sede').value;
            buscarSedes(buscar);
        });
    } else {
        console.error('Botón de búsqueda de sedes no encontrado');
    }

    // Validaciones de formularios (desactivar temporalmente las acciones PHP)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Desactivar envíos por ahora
            console.log('Formulario enviado:', this.id);
            // Las validaciones pueden quedarse, pero no dependen de PHP aún
            if (this.querySelector('#codigo_municipio')) {
                const codigo = document.getElementById('codigo_municipio').value;
                if (!/^\d{5}$/.test(codigo)) {
                    alert('El código del municipio debe ser de 5 dígitos numéricos.');
                    return;
                }
            } else if (this.querySelector('#codigo_colegio')) {
                const codigo = document.getElementById('codigo_colegio').value;
                if (!/^\d{10}$/.test(codigo)) {
                    alert('El código del colegio debe ser de 10 dígitos numéricos.');
                    return;
                }
            } else if (this.querySelector('#codigo_sede')) {
                const codigo = document.getElementById('codigo_sede').value;
                if (!/^\d{15}$/.test(codigo)) {
                    alert('El código de la sede debe ser de 15 dígitos numéricos.');
                    return;
                }
            }
            // Aquí deberías agregar un fetch para enviar los datos a un endpoint (pendiente)
        });
    });
});

// Función para cargar municipios en el select
function cargarMunicipios() {
    const selectMunicipios = document.getElementById('id_municipio');
    if (!selectMunicipios) {
        console.error('Elemento con ID "id_municipio" no encontrado');
        return;
    }

    fetch('/api/municipios')
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text(); // Usar text() para depuración
        })
        .then(text => {
            console.log('Contenido recibido:', text); // Imprime el contenido exacto
            try {
                const data = JSON.parse(text); // Intenta parsear como JSON
                console.log('Datos parseados:', data);
                if (data.error) {
                    selectMunicipios.innerHTML = '<option value="">Error: ' + data.error + '</option>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    selectMunicipios.innerHTML = '<option value="">No hay municipios disponibles</option>';
                    return;
                }
                selectMunicipios.innerHTML = data.map(municipio => `
                    <option value="${municipio.id_municipio}">${municipio.nombre}</option>
                `).join('');
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                selectMunicipios.innerHTML = '<option value="">Error al procesar datos</option>';
            }
        })
        .catch(error => {
            console.error('Error al cargar municipios:', error);
            selectMunicipios.innerHTML = '<option value="">Error al cargar municipios</option>';
        });
}

// Nueva función para cargar la tabla de municipios
function cargarTablaMunicipios() {
    console.log('Cargando tabla de municipios...');
    const tablaMunicipios = document.getElementById('tabla_municipios');
    if (!tablaMunicipios) {
        console.error('Elemento con ID "tabla_municipios" no encontrado');
        return;
    }

    const tbody = tablaMunicipios.querySelector('tbody');
    if (!tbody) {
        console.error('Elemento <tbody> no encontrado dentro de tabla_municipios');
        return;
    }

    fetch('/api/municipios')
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text();
        })
        .then(text => {
            console.log('Contenido recibido:', text);
            try {
                const data = JSON.parse(text);
                console.log('Datos parseados:', data);
                if (data.error) {
                    tbody.innerHTML = '<tr><td colspan="3">Error: ' + data.error + '</td></tr>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="3">No hay municipios disponibles</td></tr>';
                    return;
                }
                tbody.innerHTML = data.map(municipio => `
                    <tr>
                        <td>${municipio.id_municipio || ''}</td>
                        <td><a href="#" class="text-decoration-none detalle-municipio" data-id="${municipio.id_municipio || ''}">${municipio.nombre || ''}</a></td>
                        <td>
                            <a href="#" class="btn btn-sm btn-warning edit-municipio" data-id="${municipio.id_municipio || ''}"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-sm btn-danger delete-municipio" data-id="${municipio.id_municipio || ''}" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                `).join('');
                document.querySelectorAll('.detalle-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Detalles de municipio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.edit-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Editar municipio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.delete-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Eliminar municipio ${id} (pendiente de implementar)`);
                    });
                });
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                tbody.innerHTML = '<tr><td colspan="3">Error al procesar datos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error al cargar tabla de municipios:', error);
            tbody.innerHTML = '<tr><td colspan="3">Error al cargar los datos</td></tr>';
        });
}

// Función para cargar colegios en el select
function cargarColegios() {
    const selectColegios = document.getElementById('id_colegio');
    if (!selectColegios) {
        console.error('Elemento con ID "id_colegio" no encontrado');
        return;
    }

    fetch('/api/colegios')
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text();
        })
        .then(text => {
            console.log('Contenido recibido:', text);
            try {
                const data = JSON.parse(text);
                console.log('Datos parseados:', data);
                if (data.error) {
                    selectColegios.innerHTML = '<option value="">Error: ' + data.error + '</option>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    selectColegios.innerHTML = '<option value="">No hay colegios disponibles</option>';
                    return;
                }
                selectColegios.innerHTML = data.map(colegio => `
                    <option value="${colegio.id_colegio}">${colegio.nombre}</option>
                `).join('');
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                selectColegios.innerHTML = '<option value="">Error al procesar datos</option>';
            }
        })
        .catch(error => {
            console.error('Error al cargar colegios:', error);
            selectColegios.innerHTML = '<option value="">Error al cargar colegios</option>';
        });
}

// Función para buscar municipios
function buscarMunicipios(buscar) {
    console.log('Buscando municipios con término:', buscar);
    const tablaMunicipios = document.getElementById('tabla_municipios');
    if (!tablaMunicipios) {
        console.error('Elemento con ID "tabla_municipios" no encontrado');
        return;
    }

    const tbody = tablaMunicipios.querySelector('tbody');
    if (!tbody) {
        console.error('Elemento <tbody> no encontrado dentro de tabla_municipios');
        return;
    }

    fetch(`/api/municipios?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text();
        })
        .then(text => {
            console.log('Contenido recibido:', text);
            try {
                const data = JSON.parse(text);
                console.log('Datos parseados:', data);
                if (data.error) {
                    tbody.innerHTML = '<tr><td colspan="3">Error: ' + data.error + '</td></tr>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="3">No se encontraron municipios</td></tr>';
                    return;
                }
                tbody.innerHTML = data.map(municipio => `
                    <tr>
                        <td>${municipio.id_municipio || ''}</td>
                        <td><a href="#" class="text-decoration-none detalle-municipio" data-id="${municipio.id_municipio || ''}">${municipio.nombre || ''}</a></td>
                        <td>
                            <a href="#" class="btn btn-sm btn-warning edit-municipio" data-id="${municipio.id_municipio || ''}"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-sm btn-danger delete-municipio" data-id="${municipio.id_municipio || ''}" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                `).join('');
                document.querySelectorAll('.detalle-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Detalles de municipio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.edit-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Editar municipio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.delete-municipio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Eliminar municipio ${id} (pendiente de implementar)`);
                    });
                });
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                tbody.innerHTML = '<tr><td colspan="3">Error al procesar datos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error al buscar municipios:', error);
            tbody.innerHTML = '<tr><td colspan="3">Error al buscar los datos</td></tr>';
        });
}

// Función para buscar colegios
function buscarColegios(buscar) {
    const tablaColegios = document.getElementById('tabla_colegios');
    if (!tablaColegios) {
        console.error('Elemento con ID "tabla_colegios" no encontrado');
        return;
    }

    const tbody = tablaColegios.querySelector('tbody');
    if (!tbody) {
        console.error('Elemento <tbody> no encontrado dentro de tabla_colegios');
        return;
    }

    fetch(`/api/colegios?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text();
        })
        .then(text => {
            console.log('Contenido recibido:', text);
            try {
                const data = JSON.parse(text);
                console.log('Datos parseados:', data);
                if (data.error) {
                    tbody.innerHTML = '<tr><td colspan="4">Error: ' + data.error + '</td></tr>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4">No se encontraron colegios</td></tr>';
                    return;
                }
                tbody.innerHTML = data.map(colegio => `
                    <tr>
                        <td>${colegio.id_colegio || ''}</td>
                        <td><a href="#" class="text-decoration-none detalle-colegio" data-id="${colegio.id_colegio || ''}">${colegio.nombre || ''}</a></td>
                        <td>${colegio.municipio || ''}</td>
                        <td>
                            <a href="#" class="btn btn-sm btn-warning edit-colegio" data-id="${colegio.id_colegio || ''}"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-sm btn-danger delete-colegio" data-id="${colegio.id_colegio || ''}" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                `).join('');
                document.querySelectorAll('.detalle-colegio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Detalles de colegio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.edit-colegio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Editar colegio ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.delete-colegio').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Eliminar colegio ${id} (pendiente de implementar)`);
                    });
                });
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                tbody.innerHTML = '<tr><td colspan="4">Error al procesar datos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error al buscar colegios:', error);
            tbody.innerHTML = '<tr><td colspan="4">Error al buscar los datos</td></tr>';
        });
}

// Función para buscar sedes
function buscarSedes(buscar) {
    const tablaSedes = document.getElementById('tabla_sedes');
    if (!tablaSedes) {
        console.error('Elemento con ID "tabla_sedes" no encontrado');
        return;
    }

    const tbody = tablaSedes.querySelector('tbody');
    if (!tbody) {
        console.error('Elemento <tbody> no encontrado dentro de tabla_sedes');
        return;
    }

    fetch(`/api/sedes?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            console.log('Texto de la respuesta:', response.statusText);
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.text();
        })
        .then(text => {
            console.log('Contenido recibido:', text);
            try {
                const data = JSON.parse(text);
                console.log('Datos parseados:', data);
                if (data.error) {
                    tbody.innerHTML = '<tr><td colspan="4">Error: ' + data.error + '</td></tr>';
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4">No se encontraron sedes</td></tr>';
                    return;
                }
                tbody.innerHTML = data.map(sede => `
                    <tr>
                        <td>${sede.id_sede || ''}</td>
                        <td><a href="#" class="text-decoration-none detalle-sede" data-id="${sede.id_sede || ''}">${sede.nombre || ''}</a></td>
                        <td>${sede.colegio || ''}</td>
                        <td>
                            <a href="#" class="btn btn-sm btn-warning edit-sede" data-id="${sede.id_sede || ''}"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-sm btn-danger delete-sede" data-id="${sede.id_sede || ''}" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                `).join('');
                document.querySelectorAll('.detalle-sede').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Detalles de sede ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.edit-sede').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Editar sede ${id} (pendiente de implementar)`);
                    });
                });
                document.querySelectorAll('.delete-sede').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        alert(`Eliminar sede ${id} (pendiente de implementar)`);
                    });
                });
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                tbody.innerHTML = '<tr><td colspan="4">Error al procesar datos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error al buscar sedes:', error);
            tbody.innerHTML = '<tr><td colspan="4">Error al buscar los datos</td></tr>';
        });
}