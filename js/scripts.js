document.addEventListener('DOMContentLoaded', function() {
    // Municipios
    document.querySelectorAll('.detalle-municipio').forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Colegios
    document.querySelectorAll('.detalle-colegio').forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Sedes
    document.querySelectorAll('.detalle-sede').forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Validaciones existentes
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
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