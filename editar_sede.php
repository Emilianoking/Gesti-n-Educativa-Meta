<?php
include 'db/conexion.php';
$id = $_GET['id'];
$sql = "SELECT * FROM sedes WHERE id_sede = '$id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_sede'];
    $id_colegio = $_POST['id_colegio'];
    $sql = "UPDATE sedes SET nombre = '$nombre', id_colegio = '$id_colegio' WHERE id_sede = '$id'";
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Sede actualizada'); window.location='index.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Sede</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Editar Sede</h2>
        <form action="" method="POST">
            <div class="mb-3">
                <label for="id_colegio" class="form-label">Colegio</label>
                <select class="form-select" id="id_colegio" name="id_colegio" required>
                    <?php
                    $sql_col = "SELECT id_colegio, nombre FROM colegios";
                    $result_col = $conn->query($sql_col);
                    while ($col = $result_col->fetch_assoc()) {
                        $selected = $col['id_colegio'] == $row['id_colegio'] ? 'selected' : '';
                        echo "<option value='{$col['id_colegio']}' $selected>{$col['nombre']}</option>";
                    }
                    $conn->close();
                    ?>
                </select>
            </div>
            <div class="mb-3">
                <label for="nombre_sede" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre_sede" name="nombre_sede" value="<?php echo $row['nombre']; ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="index.php" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</body>
</html>