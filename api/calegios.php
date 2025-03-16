<?php
header('Content-Type: application/json');
include '../db/conexion.php';

try {
    $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
    $sql = "SELECT c.id_colegio, c.nombre, m.nombre AS municipio, d.nombre AS departamento 
            FROM colegios c 
            JOIN municipios m ON c.id_municipio = m.id_municipio 
            JOIN departamentos d ON m.id_departamento = d.id_departamento 
            WHERE c.id_colegio ILIKE :buscar OR c.nombre ILIKE :buscar";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['buscar' => "%$buscar%"]);
    $colegios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($colegios);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al consultar colegios: ' . $e->getMessage()]);
}

$conn = null;
?>