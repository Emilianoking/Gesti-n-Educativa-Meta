<?php
include 'db/conexion.php';
$id = $_GET['id'];

$sql_mun = "SELECT id_municipio, nombre FROM municipios WHERE id_municipio = '$id'";
$mun_result = $conn->query($sql_mun);
$mun = $mun_result->fetch_assoc();

echo "<h5>Detalles del Municipio</h5>";
echo "<table class='table table-bordered'>
        <tr><th>ID Municipio</th><td>{$mun['id_municipio']}</td></tr>
        <tr><th>Nombre</th><td>{$mun['nombre']}</td></tr>
      </table>";

// Colegios
$sql_col = "SELECT id_colegio, nombre FROM colegios WHERE id_municipio = '$id'";
$col_result = $conn->query($sql_col);
echo "<h6>Colegios Asociados</h6>";
echo "<table class='table table-striped table-bordered'>
        <thead><tr><th>ID Colegio</th><th>Nombre</th></tr></thead><tbody>";
if ($col_result->num_rows > 0) {
    while ($col = $col_result->fetch_assoc()) {
        echo "<tr><td>{$col['id_colegio']}</td><td>{$col['nombre']}</td></tr>";
    }
} else {
    echo "<tr><td colspan='2'>No hay colegios registrados.</td></tr>";
}
echo "</tbody></table>";

// Sedes
$sql_sed = "SELECT s.id_sede, s.nombre 
            FROM sedes s 
            JOIN colegios c ON s.id_colegio = c.id_colegio 
            WHERE c.id_municipio = '$id'";
$sed_result = $conn->query($sql_sed);
echo "<h6>Sedes Asociadas</h6>";
echo "<table class='table table-striped table-bordered'>
        <thead><tr><th>ID Sede</th><th>Nombre</th></tr></thead><tbody>";
if ($sed_result->num_rows > 0) {
    while ($sed = $sed_result->fetch_assoc()) {
        echo "<tr><td>{$sed['id_sede']}</td><td>{$sed['nombre']}</td></tr>";
    }
} else {
    echo "<tr><td colspan='2'>No hay sedes registradas.</td></tr>";
}
echo "</tbody></table>";

$conn->close();
?>