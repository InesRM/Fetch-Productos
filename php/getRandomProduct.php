<?php 
try{
  
    $productionsJson =file_get_contents('../data/productos.json');
    $productions = json_decode($productionsJson, true);

    if (empty($productions)) {
        throw new Exception("No se encontraron producciones en el archivo.");
    }
    $randomIndex = array_rand($productions, 1); //Simplificación del cálculo del índice aleatorio
    $randomProduction = $productions[$randomIndex];

    echo json_encode($randomProduction);

}catch(Exception $e){
    echo json_encode(['error' => $e->getMessage()]);
}
?>