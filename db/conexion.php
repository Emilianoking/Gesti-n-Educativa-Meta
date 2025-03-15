<?php
$host = 'svelte-vulture-7271.g8z.gcp-us-east1.cockroachlabs.cloud';
$port = '26257';
$dbname = 'gestion_educativa_meta';
$user = 'junca12';
$password = 'KMQ0MTgEeVxqXAGHovLlUA';
$sslmode = 'verify-full';
$cluster = 'svelte-vulture-7271';

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;sslmode=$sslmode;options='--cluster=$cluster'", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
