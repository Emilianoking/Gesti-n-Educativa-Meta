<?php
include 'db/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_sede'];
    $codigo_sede = $_POST['codigo_sede'];
    $id_colegio = $_POST['id_colegio'];
    $id_sede = $id_colegio . $codigo_sede;

    // Verificar que el id_sede no exista
    $check_sql = "SELECT id_sede FROM sedes WHERE id_sede = :id_sede";
    $stmt = $conn->prepare($check_sql);
    $stmt->bindParam(':id_sede', $id_sede, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "<script>alert('El código de sede ya existe para este colegio'); window.location='index.php';</script>";
    } else {
        $sql = "INSERT INTO sedes (id_sede, nombre, id_colegio) VALUES (:id_sede, :nombre, :id_colegio)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_sede', $id_sede, PDO::PARAM_STR);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':id_colegio', $id_colegio, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo "<script>alert('Sede agregada con éxito'); window.location='index.php';</script>";
        } else {
            echo "Error: " . $stmt->errorInfo()[2];
        }
    }
}

$conn = null;
?>
