<?php
include 'db/conexion.php';
$id = $_GET['id'];
$sql = "DELETE FROM municipios WHERE id_municipio = '$id'";
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Municipio eliminado'); window.location='index.php';</script>";
} else {
    echo "Error: " . $conn->error;
}
$conn->close();
?>
