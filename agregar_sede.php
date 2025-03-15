<?php
include 'db/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre_sede'];
    $codigo_sede = $_POST['codigo_sede'];
    $id_colegio = $_POST['id_colegio'];
    $id_sede = $id_colegio . $codigo_sede; // Ejemplo: 500010001 + 01 = 50001000101

    // Verificar que el id_sede no exista ya
    $check_sql = "SELECT id_sede FROM sedes WHERE id_sede = '$id_sede'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        echo "<script>alert('El código de sede ya existe para este colegio'); window.location='index.php';</script>";
    } else {
        $sql = "INSERT INTO sedes (id_sede, nombre, id_colegio) VALUES ('$id_sede', '$nombre', '$id_colegio')";
        
        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Sede agregada con éxito'); window.location='index.php';</script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}
$conn->close();
?>