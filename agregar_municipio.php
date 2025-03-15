<?php
include 'db/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_municipio'];
    $codigo_municipio = $_POST['codigo_municipio'];
    $id_departamento = '50'; // Meta
    $id_municipio = $id_departamento . $codigo_municipio;

    $sql = "INSERT INTO municipios (id_municipio, nombre, id_departamento) VALUES ('$id_municipio', '$nombre', '$id_departamento')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Municipio agregado con éxito'); window.location='index.php';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>