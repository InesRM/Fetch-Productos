<?php 
//Guardar productos en un archivo JSON

//Si no existe el archivo, lo crea

if (!file_exists('../data/productos.json')) {
    $file = fopen('../data/productos.json', 'w');
    fclose($file);
}

//Obtener los productos actuales
$products = file_get_contents('../data/productos.json');
$products = json_decode($products, true);

//Obtener los datos del producto
$product = json_decode(file_get_contents('php://input'), true);

//Agregar el producto al array si no existía previamente
if (!in_array($product, $products)){
    $products[] = $product;
}
else{
    echo "El producto ya existe";
}


//Guardar el array en el archivo
file_put_contents('../data/productos.json', json_encode($products, JSON_PRETTY_PRINT));

echo json_encode($products, JSON_PRETTY_PRINT);

//Guardar un archivo de texto con el nombre del producto añadido también

$nombre = $product['name'];
$archivo = fopen('../data/productos.txt', 'a');
fwrite($archivo, $nombre . "\n");
fclose($archivo);





?>

