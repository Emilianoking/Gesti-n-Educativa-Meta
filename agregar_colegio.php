<?php
include 'db/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_colegio'];
    $codigo_colegio = $_POST['codigo_colegio'];
    $id_municipio = $_POST['id_municipio'];
    $id_colegio = $id_municipio . $codigo_colegio;

    $sql = "INSERT INTO colegios (id_colegio, nombre, id_municipio) VALUES (:id_colegio, :nombre, :id_municipio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_colegio', $id_colegio, PDO::PARAM_STR);
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':id_municipio', $id_municipio, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo "<script>alert('Colegio agregado con éxito'); window.location='index.php';</script>";
    } else {
        echo "Error: " . $stmt->errorInfo()[2];
    }
}

$conn = null;
?>
