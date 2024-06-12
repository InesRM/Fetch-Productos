<?php 
header('Content-Type: application/json');
$productosJson = file_get_contents('../data/datos.json');

$productos = json_decode($productosJson, true);

$resultados = [];

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al leer el archivo JSON'], JSON_PRETTY_PRINT);
    exit;
}
if (isset($_GET['name'])) {
    $name = $_GET['name'];
    
    // Recorrer todas las categorías de productos
    foreach ($productos['productos'] as $categoria => $listaProductos) {
        // Buscar producto por nombre en la categoría actual
        foreach ($listaProductos as $producto) {
            if (strpos(strtolower($producto['name']), strtolower($name)) !== false) {
                $resultados[] = $producto;
            }
        }
    }
    
    if (empty($resultados)) {
        http_response_code(404);
        echo json_encode(['error' => 'Producto no encontrado'], JSON_PRETTY_PRINT);
    } else {
        echo json_encode($resultados, JSON_PRETTY_PRINT);
    }
} else {
    // Si no se pasa ningún parámetro 'name', devolver todos los productos
    echo json_encode($productos['productos'], JSON_PRETTY_PRINT);
}
?>