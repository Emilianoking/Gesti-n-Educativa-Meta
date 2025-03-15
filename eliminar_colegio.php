<?php
include 'db/conexion.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM colegios WHERE id_colegio = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo "<script>alert('Colegio eliminado'); window.location='index.php';</script>";
    } else {
        echo "Error: No se pudo eliminar el colegio.";
    }
} else {
    echo "Error: ID no válido.";
}
?>
