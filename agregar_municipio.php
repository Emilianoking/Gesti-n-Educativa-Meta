<?php
include 'db/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_municipio'];
    $codigo_municipio = $_POST['codigo_municipio'];
    $id_departamento = '50'; // Meta
    $id_municipio = $id_departamento . $codigo_municipio;

    $sql = "INSERT INTO municipios (id_municipio, nombre, id_departamento) VALUES (:id_municipio, :nombre, :id_departamento)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_municipio', $id_municipio, PDO::PARAM_STR);
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':id_departamento', $id_departamento, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo "<script>alert('Municipio agregado con éxito'); window.location='index.html';</script>";
    } else {
        echo "Error: " . $stmt->errorInfo()[2];
    }
}

$conn = null;
?>
