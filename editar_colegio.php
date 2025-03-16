<?php
include 'db/conexion.php';

$id = $_GET['id'];
$sql = "SELECT * FROM colegios WHERE id_colegio = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_colegio'];
    $id_municipio = $_POST['id_municipio'];
    $sql = "UPDATE colegios SET nombre = ?, id_municipio = ? WHERE id_colegio = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$nombre, $id_municipio, $id])) {
        echo "<script>alert('Colegio actualizado'); window.location='index.html';</script>";
    } else {
        echo "Error: " . $conn->errorInfo()[2];
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Colegio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Editar Colegio</h2>
        <form action="" method="POST">
            <div class="mb-3">
                <label for="id_municipio" class="form-label">Municipio</label>
                <select class="form-select" id="id_municipio" name="id_municipio" required>
                    <?php
                    $sql_mun = "SELECT id_municipio, nombre FROM municipios";
                    $stmt_mun = $conn->query($sql_mun);
                    while ($mun = $stmt_mun->fetch(PDO::FETCH_ASSOC)) {
                        $selected = $mun['id_municipio'] == $row['id_municipio'] ? 'selected' : '';
                        echo "<option value='{$mun['id_municipio']}' $selected>{$mun['nombre']}</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="mb-3">
                <label for="nombre_colegio" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre_colegio" name="nombre_colegio" value="<?php echo htmlspecialchars($row['nombre']); ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="index.html" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</body>
</html>
