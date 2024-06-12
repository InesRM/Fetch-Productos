<?php 
// Obtener el contenido de los productos de la categoría seleccionada del desplegable

header('Content-Type: application/json');

// Leer el archivo JSON
$productosJson = file_get_contents('../data/datos.json');
if ($productosJson === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al leer el archivo JSON'], JSON_PRETTY_PRINT);
    exit;
}

// Decodificar el JSON
$productos = json_decode($productosJson, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al decodificar el JSON: ' . json_last_error_msg()], JSON_PRETTY_PRINT);
    exit;
}

$resultados = [];

if (isset($_GET['category'])) {
    $category = $_GET['category'];
    
    // Recorrer todas las categorías de productos
    foreach ($productos['productos'] as $listaProductos) {
        foreach ($listaProductos as $producto) {
            if (strcasecmp($producto['cat'], $category) === 0) {
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
    http_response_code(400);
    echo json_encode(['error' => 'Categoría no especificada'], JSON_PRETTY_PRINT);
}
?>
