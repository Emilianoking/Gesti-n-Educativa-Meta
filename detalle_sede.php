<?php
include 'db/conexion.php';
$id = $_GET['id'];

$sql_sed = "SELECT s.id_sede, s.nombre AS sede, c.id_colegio, c.nombre AS colegio, m.id_municipio, m.nombre AS municipio 
            FROM sedes s 
            JOIN colegios c ON s.id_colegio = c.id_colegio 
            JOIN municipios m ON c.id_municipio = m.id_municipio 
            WHERE s.id_sede = '$id'";
$sed_result = $conn->query($sql_sed);
$sed = $sed_result->fetch_assoc();

echo "<h5>Detalles de la Sede</h5>";
echo "<table class='table table-bordered'>
        <tr><th>ID Sede</th><td>{$sed['id_sede']}</td></tr>
        <tr><th>Nombre</th><td>{$sed['sede']}</td></tr>
        <tr><th>ID Colegio</th><td>{$sed['id_colegio']}</td></tr>
        <tr><th>Colegio</th><td>{$sed['colegio']}</td></tr>
        <tr><th>ID Municipio</th><td>{$sed['id_municipio']}</td></tr>
        <tr><th>Municipio</th><td>{$sed['municipio']}</td></tr>
      </table>";

$conn->close();
?>