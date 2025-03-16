<?php
header('Content-Type: application/json');
include '../db/conexion.php';

try {
    $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
    $sql = "SELECT s.id_sede, s.nombre, c.nombre AS colegio, m.nombre AS municipio, d.nombre AS departamento 
            FROM sedes s 
            JOIN colegios c ON s.id_colegio = c.id_colegio 
            JOIN municipios m ON c.id_municipio = m.id_municipio 
            JOIN departamentos d ON m.id_departamento = d.id_departamento 
            WHERE s.id_sede ILIKE :buscar OR s.nombre ILIKE :buscar";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['buscar' => "%$buscar%"]);
    $sedes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($sedes);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al consultar sedes: ' . $e->getMessage()]);
}

$conn = null;
?>