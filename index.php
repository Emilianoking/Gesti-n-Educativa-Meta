<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Educativa - Meta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Gestión Educativa Meta</a>
        </div>
    </nav>

    <div class="container mt-4">
        <h1 class="text-center mb-4">Sistema de Gestión Educativa</h1>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="municipios-tab" data-bs-toggle="tab" data-bs-target="#municipios"
                    type="button" role="tab">Municipios</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="colegios-tab" data-bs-toggle="tab" data-bs-target="#colegios" type="button"
                    role="tab">Colegios</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="sedes-tab" data-bs-toggle="tab" data-bs-target="#sedes" type="button"
                    role="tab">Sedes</button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <!-- Municipios -->
            <div class="tab-pane fade show active" id="municipios" role="tabpanel">
                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Agregar Municipio</h5>
                                <form action="agregar_municipio.php" method="POST">
                                    <div class="mb-3">
                                        <label for="nombre_municipio" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombre_municipio"
                                            name="nombre_municipio" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="codigo_municipio" class="form-label">Código</label>
                                        <input type="text" class="form-control" id="codigo_municipio"
                                            name="codigo_municipio" maxlength="3" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i>
                                        Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Lista de Municipios</h5>
                                <form method="GET" class="mb-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="buscar_municipio"
                                            placeholder="Buscar por ID o Nombre"
                                            value="<?php echo isset($_GET['buscar_municipio']) ? $_GET['buscar_municipio'] : ''; ?>">
                                        <button class="btn btn-outline-secondary" type="submit"><i
                                                class="fas fa-search"></i></button>
                                    </div>
                                </form>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        include 'db/conexion.php';
                                        $buscar = isset($_GET['buscar_municipio']) ? $_GET['buscar_municipio'] : '';
                                        $sql = "SELECT * FROM municipios WHERE id_municipio LIKE :buscar OR nombre LIKE :buscar";
                                        $stmt = $conn->prepare($sql);
                                        $stmt->execute(['buscar' => "%$buscar%"]);

                                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                            echo "<tr>
                <td>{$row['id_municipio']}</td>
                <td><a href='#' class='text-decoration-none detalle-municipio' data-id='{$row['id_municipio']}'>{$row['nombre']}</a></td>
                <td>
                    <a href='editar_municipio.php?id={$row['id_municipio']}' class='btn btn-sm btn-warning'><i class='fas fa-edit'></i></a>
                    <a href='eliminar_municipio.php?id={$row['id_municipio']}' class='btn btn-sm btn-danger' onclick='return confirm(\"¿Seguro?\");'><i class='fas fa-trash'></i></a>
                </td>
            </tr>";
                                        }
                                        ?>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colegios -->
            <div class="tab-pane fade" id="colegios" role="tabpanel">
                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Agregar Colegio</h5>
                                <form action="agregar_colegio.php" method="POST">
                                    <div class="mb-3">
                                        <label for="id_municipio" class="form-label">Municipio</label>
                                        <select class="form-select" id="id_municipio" name="id_municipio" required>
                                            <?php
                                            include 'db/conexion.php';
                                            $sql = "SELECT id_municipio, nombre FROM municipios";
                                            $stmt = $conn->prepare($sql);
                                            $stmt->execute();

                                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                                echo "<option value='{$row['id_municipio']}'>{$row['nombre']}</option>";
                                            }
                                            ?>
                                        </select>

                                    </div>
                                    <div class="mb-3">
                                        <label for="nombre_colegio" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombre_colegio"
                                            name="nombre_colegio" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="codigo_colegio" class="form-label">Código </label>
                                        <input type="text" class="form-control" id="codigo_colegio"
                                            name="codigo_colegio" maxlength="4" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i>
                                        Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Lista de Colegios</h5>
                                <form method="GET" class="mb-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="buscar_colegio"
                                            placeholder="Buscar por ID o Nombre"
                                            value="<?php echo isset($_GET['buscar_colegio']) ? $_GET['buscar_colegio'] : ''; ?>">
                                        <button class="btn btn-outline-secondary" type="submit"><i
                                                class="fas fa-search"></i></button>
                                    </div>
                                </form>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Municipio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        include 'db/conexion.php';
                                        $buscar = isset($_GET['buscar_colegio']) ? $_GET['buscar_colegio'] : '';
                                        $sql = "SELECT c.id_colegio, c.nombre, m.nombre AS municipio 
            FROM colegios c 
            JOIN municipios m ON c.id_municipio = m.id_municipio 
            WHERE c.id_colegio LIKE :buscar OR c.nombre LIKE :buscar";
                                        $stmt = $conn->prepare($sql);
                                        $stmt->execute(['buscar' => "%$buscar%"]);

                                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                            echo "<tr>
                <td>{$row['id_colegio']}</td>
                <td><a href='#' class='text-decoration-none detalle-colegio' data-id='{$row['id_colegio']}'>{$row['nombre']}</a></td>
                <td>{$row['municipio']}</td>
                <td>
                    <a href='editar_colegio.php?id={$row['id_colegio']}' class='btn btn-sm btn-warning'><i class='fas fa-edit'></i></a>
                    <a href='eliminar_colegio.php?id={$row['id_colegio']}' class='btn btn-sm btn-danger' onclick='return confirm(\"¿Seguro?\");'><i class='fas fa-trash'></i></a>
                </td>
            </tr>";
                                        }
                                        ?>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sedes -->
            <div class="tab-pane fade" id="sedes" role="tabpanel">
                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Agregar Sede</h5>
                                <form action="agregar_sede.php" method="POST">
                                    <div class="mb-3">
                                        <label for="id_colegio" class="form-label">Colegio</label>
                                        <select class="form-select" id="id_colegio" name="id_colegio" required>
                                            <?php
                                            include 'db/conexion.php';
                                            $sql = "SELECT id_colegio, nombre FROM colegios";
                                            $stmt = $conn->prepare($sql);
                                            $stmt->execute();

                                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                                echo "<option value='{$row['id_colegio']}'>{$row['nombre']}</option>";
                                            }
                                            ?>
                                        </select>

                                    </div>
                                    <div class="mb-3">
                                        <label for="nombre_sede" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombre_sede" name="nombre_sede"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="codigo_sede" class="form-label">Código </label>
                                        <input type="text" class="form-control" id="codigo_sede" name="codigo_sede"
                                            maxlength="2" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i>
                                        Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Lista de Sedes</h5>
                                <form method="GET" class="mb-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="buscar_sede"
                                            placeholder="Buscar por ID o Nombre"
                                            value="<?php echo isset($_GET['buscar_sede']) ? $_GET['buscar_sede'] : ''; ?>">
                                        <button class="btn btn-outline-secondary" type="submit"><i
                                                class="fas fa-search"></i></button>
                                    </div>
                                </form>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Colegio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        include 'db/conexion.php';
                                        $buscar = isset($_GET['buscar_sede']) ? $_GET['buscar_sede'] : '';
                                        $sql = "SELECT s.id_sede, s.nombre, c.nombre AS colegio 
            FROM sedes s 
            JOIN colegios c ON s.id_colegio = c.id_colegio 
            WHERE s.id_sede LIKE :buscar OR s.nombre LIKE :buscar";
                                        $stmt = $conn->prepare($sql);
                                        $stmt->execute(['buscar' => "%$buscar%"]);

                                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                            echo "<tr>
                <td>{$row['id_sede']}</td>
                <td><a href='#' class='text-decoration-none detalle-sede' data-id='{$row['id_sede']}'>{$row['nombre']}</a></td>
                <td>{$row['colegio']}</td>
                <td>
                    <a href='editar_sede.php?id={$row['id_sede']}' class='btn btn-sm btn-warning'><i class='fas fa-edit'></i></a>
                    <a href='eliminar_sede.php?id={$row['id_sede']}' class='btn btn-sm btn-danger' onclick='return confirm(\"¿Seguro?\");'><i class='fas fa-trash'></i></a>
                </td>
            </tr>";
                                        }
                                        ?>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para detalles -->
    <!-- Modal para detalles -->
    <div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg"> <!-- Cambiado a modal-lg para más espacio -->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detalleModalLabel">Detalles</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="detalleContenido">
                    <!-- Contenido cargado dinámicamente -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js"></script>
</body>

</html>