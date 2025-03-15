<?php
include 'db/conexion.php';
$id = $_GET['id'];

$sql_col = "SELECT c.id_colegio, c.nombre AS colegio, m.id_municipio, m.nombre AS municipio 
            FROM colegios c 
            JOIN municipios m ON c.id_municipio = m.id_municipio 
            WHERE c.id_colegio = :id";

$stmt = $conn->prepare($sql_col);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$col = $stmt->fetch(PDO::FETCH_ASSOC);

if ($col) {
    echo "<h5>Detalles del Colegio</h5>";
    echo "<table class='table table-bordered'>
            <tr><th>ID Colegio</th><td>{$col['id_colegio']}</td></tr>
            <tr><th>Nombre</th><td>{$col['colegio']}</td></tr>
            <tr><th>ID Municipio</th><td>{$col['id_municipio']}</td></tr>
            <tr><th>Municipio</th><td>{$col['municipio']}</td></tr>
          </table>";

    // Sedes
    $sql_sed = "SELECT id_sede, nombre FROM sedes WHERE id_colegio = :id";
    $stmt_sed = $conn->prepare($sql_sed);
    $stmt_sed->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt_sed->execute();
    $sedes = $stmt_sed->fetchAll(PDO::FETCH_ASSOC);

    echo "<h6>Sedes Asociadas</h6>";
    echo "<table class='table table-striped table-bordered'>
            <thead><tr><th>ID Sede</th><th>Nombre</th></tr></thead><tbody>";

    if ($sedes) {
        foreach ($sedes as $sed) {
            echo "<tr><td>{$sed['id_sede']}</td><td>{$sed['nombre']}</td></tr>";
        }
    } else {
        echo "<tr><td colspan='2'>No hay sedes registradas.</td></tr>";
    }

    echo "</tbody></table>";
} else {
    echo "No se encontraron datos para el colegio.";
}

$conn = null; // Cerrar conexión
?>
