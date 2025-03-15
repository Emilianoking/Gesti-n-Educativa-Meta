<?php
include 'db/conexion.php';

$id = $_GET['id'];
$sql = "SELECT * FROM municipios WHERE id_municipio = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_municipio'];
    $sql = "UPDATE municipios SET nombre = ? WHERE id_municipio = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$nombre, $id])) {
        echo "<script>alert('Municipio actualizado'); window.location='index.php';</script>";
    } else {
        echo "Error: " . $conn->errorInfo()[2];
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Municipio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Editar Municipio</h2>
        <form action="" method="POST">
            <div class="mb-3">
                <label for="nombre_municipio" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre_municipio" name="nombre_municipio" value="<?php echo htmlspecialchars($row['nombre']); ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="index.php" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</body>
</html>
