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

    // Validaciones de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            if (this.action.includes('agregar_municipio.php')) {
                const codigo = document.getElementById('codigo_municipio').value;
                if (!/^\d{5}$/.test(codigo)) {
                    alert('El código del municipio debe ser de 5 dígitos numéricos.');
                    e.preventDefault();
                }
            } else if (this.action.includes('agregar_colegio.php')) {
                const codigo = document.getElementById('codigo_colegio').value;
                if (!/^\d{10}$/.test(codigo)) {
                    alert('El código del colegio debe ser de 10 dígitos numéricos.');
                    e.preventDefault();
                }
            } else if (this.action.includes('agregar_sede.php')) {
                const codigo = document.getElementById('codigo_sede').value;
                if (!/^\d{15}$/.test(codigo)) {
                    alert('El código de la sede debe ser de 15 dígitos numéricos.');
                    e.preventDefault();
                }
            }
        });
    });
});

// Función para cargar municipios en el select
function cargarMunicipios() {
    const selectMunicipios = document.getElementById('id_municipio'); // Cambiado de 'municipios' a 'id_municipio'
    if (!selectMunicipios) {
        console.error('Elemento con ID "id_municipio" no encontrado');
        return;
    }

    fetch('./api/municipios.php')
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log('Datos para select de municipios:', data);
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

    fetch('./api/municipios.php')
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos para tabla de municipios:', data);
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
                        <a href="editar_municipio.php?id=${municipio.id_municipio || ''}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_municipio.php?id=${municipio.id_municipio || ''}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
            // Agregar eventos a los enlaces de detalle
            document.querySelectorAll('.detalle-municipio').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const id = this.getAttribute('data-id');
                    fetch(`detalle_municipio.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('detalleContenido').innerHTML = data;
                            new bootstrap.Modal(document.getElementById('detalleModal')).show();
                        })
                        .catch(error => console.error('Error en detalle municipio:', error));
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar tabla de municipios:', error);
            tbody.innerHTML = '<tr><td colspan="3">Error al cargar los datos</td></tr>';
        });
}

// Función para cargar colegios en el select
function cargarColegios() {
    const selectColegios = document.getElementById('id_colegio'); // Cambiado de 'colegios' a 'id_colegio'
    if (!selectColegios) {
        console.error('Elemento con ID "id_colegio" no encontrado');
        return;
    }

    fetch('./api/colegios.php')
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log('Datos para select de colegios:', data);
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

    fetch(`./api/municipios.php?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos al buscar municipios:', data);
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
                        <a href="editar_municipio.php?id=${municipio.id_municipio || ''}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_municipio.php?id=${municipio.id_municipio || ''}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
            // Agregar eventos a los enlaces de detalle
            document.querySelectorAll('.detalle-municipio').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const id = this.getAttribute('data-id');
                    fetch(`detalle_municipio.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('detalleContenido').innerHTML = data;
                            new bootstrap.Modal(document.getElementById('detalleModal')).show();
                        })
                        .catch(error => console.error('Error en detalle municipio:', error));
                });
            });
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

    fetch(`./api/colegios.php?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
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
                        <a href="editar_colegio.php?id=${colegio.id_colegio || ''}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_colegio.php?id=${colegio.id_colegio || ''}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
            // Agregar eventos a los enlaces de detalle
            document.querySelectorAll('.detalle-colegio').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const id = this.getAttribute('data-id');
                    fetch(`detalle_colegio.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('detalleContenido').innerHTML = data;
                            new bootstrap.Modal(document.getElementById('detalleModal')).show();
                        })
                        .catch(error => console.error('Error en detalle colegio:', error));
                });
            });
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

    fetch(`./api/sedes.php?buscar=${encodeURIComponent(buscar)}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API: ' + response.status);
            return response.json();
        })
        .then(data => {
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
                        <a href="editar_sede.php?id=${sede.id_sede || ''}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_sede.php?id=${sede.id_sede || ''}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
            // Agregar eventos a los enlaces de detalle
            document.querySelectorAll('.detalle-sede').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const id = this.getAttribute('data-id');
                    fetch(`detalle_sede.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('detalleContenido').innerHTML = data;
                            new bootstrap.Modal(document.getElementById('detalleModal')).show();
                        })
                        .catch(error => console.error('Error en detalle sede:', error));
                });
            });
        })
        .catch(error => {
            console.error('Error al buscar sedes:', error);
            tbody.innerHTML = '<tr><td colspan="4">Error al buscar los datos</td></tr>';
        });
}