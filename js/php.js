// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    // Realizar una llamada AJAX al archivo PHP para agregar el producto al carrito
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Actualizar el contenido del carrito en la página
            mostrarCarrito(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "carrito.php?accion=agregar&productoId=" + productoId, true);
    xhttp.send();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    // Realizar una llamada AJAX al archivo PHP para eliminar el producto del carrito
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Actualizar el contenido del carrito en la página
            mostrarCarrito(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "carrito.php?accion=eliminar&productoId=" + productoId, true);
    xhttp.send();
}

// Función para mostrar el contenido del carrito en la página
function mostrarCarrito(carrito) {
    var listaCarrito = document.getElementById("carrito-lista");
    listaCarrito.innerHTML = "";

    carrito.forEach(function(producto) {
        var li = document.createElement("li");
        li.innerHTML = producto.nombre + " - Cantidad: " + producto.cantidad +
                       '<button onclick="eliminarDelCarrito(' + producto.id + ')">Eliminar</button>';
        listaCarrito.appendChild(li);
    });
}

// Obtener el contenido del carrito al cargar la página
window.onload = function() {
    // Realizar una llamada AJAX al archivo PHP para obtener el contenido del carrito
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Mostrar el contenido del carrito en la página
            mostrarCarrito(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "carrito.php?accion=obtener", true);
    xhttp.send();
};
