<?php
header('Content-Type: application/json');
include '../db/conexion.php';

try {
    $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
    $sql = "SELECT m.id_municipio, m.nombre, d.nombre AS departamento 
            FROM municipios m 
            LEFT JOIN departamentos d ON m.id_departamento = d.id_departamento 
            WHERE m.id_municipio ILIKE :buscar OR m.nombre ILIKE :buscar";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['buscar' => "%$buscar%"]);
    $municipios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($municipios);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al consultar municipios: ' . $e->getMessage()]);
}

$conn = null;
?>