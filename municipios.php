<?php
header('Content-Type: application/json');
include 'db/conexion.php';

$sql = "SELECT id_municipio, nombre FROM municipios";
$stmt = $conn->prepare($sql);
$stmt->execute();
$municipios = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($municipios);
$conn = null;
?>