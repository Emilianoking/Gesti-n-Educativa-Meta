<?php
include 'db/conexion.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM sedes WHERE id_sede = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo "<script>alert('Sede eliminada'); window.location='index.html';</script>";
    } else {
        echo "Error: No se pudo eliminar la sede.";
    }
} else {
    echo "Error: ID no válido.";
}
?>
