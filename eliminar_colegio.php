<?php
include 'db/conexion.php';
$id = $_GET['id'];
$sql = "DELETE FROM colegios WHERE id_colegio = '$id'";
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Colegio eliminado'); window.location='index.php';</script>";
} else {
    echo "Error: " . $conn->error;
}
$conn->close();
?>