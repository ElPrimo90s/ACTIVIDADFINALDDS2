<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root@localhost";
$password = "root";
$dbname = "clarmj";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Función para agregar un producto al carrito
function agregarAlCarrito($productoId) {
    global $conn;
    
    // Verificar si el producto ya está en el carrito
    $sql = "SELECT * FROM carrito WHERE producto_id = $productoId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Actualizar la cantidad del producto en el carrito
        $sql = "UPDATE carrito SET cantidad = cantidad + 1 WHERE producto_id = $productoId";
        $conn->query($sql);
    } else {
        // Agregar el producto al carrito con una cantidad de 1
        $sql = "INSERT INTO carrito (producto_id, cantidad) VALUES ($productoId, 1)";
        $conn->query($sql);
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito($productoId) {
    global $conn;

    $sql = "DELETE FROM carrito WHERE producto_id = $productoId";
    $conn->query($sql);
}

// Función para obtener el contenido del carrito
function obtenerCarrito() {
    global $conn;

    $sql = "SELECT p.id, p.nombre, p.precio, c.cantidad FROM productos p
            INNER JOIN carrito c ON p.id = c.producto_id";
    $result = $conn->query($sql);
    $carrito = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $carrito[] = $row;
        }
    }

    return $carrito;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
