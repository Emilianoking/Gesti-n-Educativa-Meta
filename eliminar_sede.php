<?php
include 'db/conexion.php';
$id = $_GET['id'];
$sql = "DELETE FROM sedes WHERE id_sede = '$id'";
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Sede eliminada'); window.location='index.php';</script>";
} else {
    echo "Error: " . $conn->error;
}
$conn->close();
?>