document.addEventListener('DOMContentLoaded', function () {
    // Cargar municipios al iniciar
    cargarMunicipios();
    cargarColegios();

    // Evento de búsqueda para municipios
    document.getElementById('btnBuscarMunicipio').addEventListener('click', function () {
        const buscar = document.getElementById('buscar_municipio').value;
        buscarMunicipios(buscar);
    });

    // Evento de búsqueda para colegios
    document.getElementById('btnBuscarColegio').addEventListener('click', function () {
        const buscar = document.getElementById('buscar_colegio').value;
        buscarColegios(buscar);
    });

    // Evento de búsqueda para sedes
    document.getElementById('btnBuscarSede').addEventListener('click', function () {
        const buscar = document.getElementById('buscar_sede').value;
        buscarSedes(buscar);
    });

    // Detalles de municipios
    document.querySelectorAll('.detalle-municipio').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            fetch(`detalle_municipio.php?id=${id}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('detalleContenido').innerHTML = data;
                    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
                    modal.show();
                });
        });
    });

    // Detalles de colegios
    document.querySelectorAll('.detalle-colegio').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            fetch(`detalle_colegio.php?id=${id}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('detalleContenido').innerHTML = data;
                    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
                    modal.show();
                });
        });
    });

    // Detalles de sedes
    document.querySelectorAll('.detalle-sede').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            fetch(`detalle_sede.php?id=${id}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('detalleContenido').innerHTML = data;
                    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
                    modal.show();
                });
        });
    });

    // Validaciones de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            if (this.action.includes('agregar_municipio.php')) {
                const codigo = document.getElementById('codigo_municipio').value;
                if (!/^\d{3}$/.test(codigo)) {
                    alert('El código del municipio debe ser de 3 dígitos numéricos.');
                    e.preventDefault();
                }
            } else if (this.action.includes('agregar_colegio.php')) {
                const codigo = document.getElementById('codigo_colegio').value;
                if (!/^\d{4}$/.test(codigo)) {
                    alert('El código del colegio debe ser de 4 dígitos numéricos.');
                    e.preventDefault();
                }
            } else if (this.action.includes('agregar_sede.php')) {
                const codigo = document.getElementById('codigo_sede').value;
                if (!/^\d{2}$/.test(codigo)) {
                    alert('El código de la sede debe ser de 2 dígitos numéricos.');
                    e.preventDefault();
                }
            }
        });
    });
});

// Función para cargar municipios en el select
function cargarMunicipios() {
    fetch('../municipios')
        .then(response => response.json())
        .then(data => {
            const selectMunicipios = document.getElementById('municipios');
            selectMunicipios.innerHTML = data.map(municipio => `
                <option value="${municipio.id_municipio}">${municipio.nombre}</option>
            `).join('');
        });
}

// Función para cargar colegios en el select
function cargarColegios() {
    fetch('/api/colegios')
        .then(response => response.json())
        .then(data => {
            const selectColegios = document.getElementById('colegios');
            selectColegios.innerHTML = data.map(colegio => `
                <option value="${colegio.id_colegio}">${colegio.nombre}</option>
            `).join('');
        });
}

// Función para buscar municipios
function buscarMunicipios(buscar) {
    fetch(`/api/municipios?buscar=${buscar}`)
        .then(response => response.json())
        .then(data => {
            const tablaMunicipios = document.getElementById('tabla_municipios').querySelector('tbody');
            tablaMunicipios.innerHTML = data.map(municipio => `
                <tr>
                    <td>${municipio.id_municipio}</td>
                    <td><a href="#" class="text-decoration-none detalle-municipio" data-id="${municipio.id_municipio}">${municipio.nombre}</a></td>
                    <td>
                        <a href="editar_municipio.php?id=${municipio.id_municipio}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_municipio.php?id=${municipio.id_municipio}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
        });
}

// Función para buscar colegios
function buscarColegios(buscar) {
    fetch(`/api/colegios?buscar=${buscar}`)
        .then(response => response.json())
        .then(data => {
            const tablaColegios = document.getElementById('tabla_colegios').querySelector('tbody');
            tablaColegios.innerHTML = data.map(colegio => `
                <tr>
                    <td>${colegio.id_colegio}</td>
                    <td><a href="#" class="text-decoration-none detalle-colegio" data-id="${colegio.id_colegio}">${colegio.nombre}</a></td>
                    <td>${colegio.municipio}</td>
                    <td>
                        <a href="editar_colegio.php?id=${colegio.id_colegio}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_colegio.php?id=${colegio.id_colegio}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
        });
}

// Función para buscar sedes
function buscarSedes(buscar) {
    fetch(`/api/sedes?buscar=${buscar}`)
        .then(response => response.json())
        .then(data => {
            const tablaSedes = document.getElementById('tabla_sedes').querySelector('tbody');
            tablaSedes.innerHTML = data.map(sede => `
                <tr>
                    <td>${sede.id_sede}</td>
                    <td><a href="#" class="text-decoration-none detalle-sede" data-id="${sede.id_sede}">${sede.nombre}</a></td>
                    <td>${sede.colegio}</td>
                    <td>
                        <a href="editar_sede.php?id=${sede.id_sede}" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="eliminar_sede.php?id=${sede.id_sede}" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro?');"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `).join('');
        });
}