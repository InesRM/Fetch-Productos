// import productosData from "../data/productos.js";
window.addEventListener("load", function () {
  // Esperar a que la página cargue completamente
  console.log("Inicio");

  // --- Manejo del formulario y tabla ---

  const createButton = document.getElementById("create");
  const resultsTableBody = document.querySelector("#results tbody");
  const selectedfilmTextarea = document.getElementById("selected-productos");
  const deleteButton = document.getElementById("delete");
  const randomButton = document.getElementById("random");
  const searchButton = document.getElementById("button-addon2");
  const sendButton = document.getElementById("send"); //Botón para guardar los datos en el archivo json
  const resultadoElement = document.querySelector("#resultado");
  const btnFavoritos = document.getElementById("btnFavoritos");
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  createButton.addEventListener("click", function () {
    const name = document.getElementById("validationDefault01");
    const description = document.getElementById("validationDefault02");
    const price = document.getElementById("validationDefault03");
    const images = document.getElementById("validationDefault04");

    //Crear los elementos individualmente
    const newRow = document.createElement("tr");
    const newName = document.createElement("td");
    const newDescription = document.createElement("td");
    const newPrice = document.createElement("td");
    const newimage = document.createElement("td");

    //Agregar los elementos a la fila

    newName.textContent = name.value;
    newDescription.textContent = description.value;
    newPrice.textContent = price.value;
    newimage.textContent = images.value;

    newRow.appendChild(newName);
    newRow.appendChild(newDescription);
    newRow.appendChild(newPrice);
    newRow.appendChild(newimage);

    resultsTableBody.appendChild(newRow);
    // if (validateForm()) {
    document.getElementsByName("productoForm")[0].value = "";
    // }
  });

  // validateForm = function () {
  //   isValid = true;
  //   document.querySelectorAll("input[required]").forEach(function (input) {
  //     if (input.value === "") {
  //       input.classList.add("is-invalid");
  //       isValid = false;
  //     } else {
  //       input.classList.remove("is-invalid");
  //       input.classList.add("is-valid");
  //     }
  //   });
  // };

  // --- MOSTRAR LOS DATOS DE LA FILA SELECCIONADA EN EL TEXTAREA ---
  resultsTableBody.addEventListener("click", function (event) {
    const clickedRow = event.target.closest("tr"); // Encontrar la fila clicada

    // Deseleccionar otras filas y seleccionar la clicada
    resultsTableBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("selected"));
    clickedRow.classList.add("selected");

    // Obtener datos de la fila y mostrar en textarea
    const productData = {
      name: clickedRow.cells[0].textContent,
      description: clickedRow.cells[1].textContent,
      price: clickedRow.cells[2].textContent,
      images: clickedRow.cells[3].textContent,
    };
    selectedfilmTextarea.value = JSON.stringify(productData, null, 4); // Convertir a JSON con formato el null es para que no haya espacios y el 2 es para que haya 2 espacios
  });

  // --- Random button
  randomButton.addEventListener("click", function () {
    fetch("../php/getRandomProduct.php")
      .then((response) => response.json())
      .then((productos) => {
        document.getElementById("validationDefault01").value = productos.name;
        document.getElementById("validationDefault02").value =
          productos.description;
        document.getElementById("validationDefault03").value = productos.price;
        document.getElementById("validationDefault04").value = productos.images;
      })
      .catch((error) =>
        console.error("Error al obtener la pelicula aleatoria", error)
      );
  });

  //---Desplegable para seleccionar la Categoría

  const selectCategorias = document.querySelector("#categorias");

  function cargarCategorias() {
    selectCategorias.innerHTML =
      '<option value="">Selecciona una Categoría</option>';

    fetch("../php/getCategories.php")
      .then((response) => response.json())
      .then((categoria) => {
        categoria.forEach((categoria) => {
          const option = document.createElement("option");
          option.textContent = categoria.title;
          option.value = categoria.title;
          selectCategorias.appendChild(option);
        });
      });
  }

  if (selectCategorias) {
    cargarCategorias();

    //CARGAR LOS PRODUCTOS DE LA CATEGORÍA SELECCIONADA EN EL DESPLEGABLE
    selectCategorias.addEventListener("change", function () {
      const categoria = selectCategorias.value;

      if (categoria) {
        fetch(`../php/getProductsByCat.php?category=${categoria}`) //en el script también tiene que ser category
          .then((response) => response.json())
          .then((productos) => {
            resultadoElement.innerHTML = ""; //Limpiar el contenido del div

            productos.forEach((producto) => {
              const card = document.createElement("div");
              card.classList.add("card");
              card.innerHTML = `
              <img src="${producto.images}" class="card-img-top" alt="${producto.name}">
              <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <p class="card-text">${producto.price} €</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"  data-product-name="${producto.name}">Ver detalles</button>
              </div>
              `;
              resultadoElement.appendChild(card);
            });
          })
          .catch((error) => {
            resultadoElement.innerHTML =
              "<p>Error al cargar los productos: " + error.message + "</p>";
            console.error(
              "Error al obtener los productos de la categoría",
              error
            );
          });
      }
    });

    //MODAL para mostrar los detalles del producto
    resultadoElement.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-primary")) {
        const name = event.target.getAttribute("data-product-name");
        fetch(`../php/getProductsByName.php?name=${name}`)
          .then((response) => response.json())
          .then((producto) => {
            modalTitle.textContent = producto.name;
            modalBody.innerHTML = `
          <img src="${producto.images}" class="card-img-top" alt="${producto.name}">
          <h5 class="card-title">${producto.name}</h5>
          <p class="card-text">${producto.description}</p>
          <p class="card-text">${producto.price} €</p>
          `;
            // const btnFavoritos = document.getElementsById("#btnFavoritos");
            btnFavoritos.setAttribute("data-product-name", producto.name);
            btnFavoritos.setAttribute("data-product-price", producto.price);
            btnFavoritos.setAttribute("data-product-images", producto.images);
            btnFavoritos.setAttribute(
              "data-product-description",
              producto.description
            );

            const btnCerrar = document.getElementById("btnClose");
            btnCerrar.addEventListener("click", function () {
              modalTitle.textContent = "";
              modalBody.innerHTML = "";
            });
          })
          .catch((error) => {
            console.error("Error al obtener el producto", error);
          });
      }
    });

    //Añadir a favoritos
    modalFooter.addEventListener("click", function (event) {
      if (event.target.id === "btnFavoritos") {
        const name = event.target.getAttribute("data-product-name");
        const price = event.target.getAttribute("data-product-price");
        const images = event.target.getAttribute("data-product-images");
        const description = event.target.getAttribute(
          "data-product-description"
        );

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (!favoritos.some((producto) => producto.name === name)) {
          favoritos.push({ name, price, images, description });
          localStorage.setItem("favoritos", JSON.stringify(favoritos));
          const message = document.createElement("div");
          message.classList.add("alert", "alert-success", "mt-3");
          message.textContent = "Producto agregado a favoritos";
          modalFooter.appendChild(message);
          setTimeout(() => {
            message.remove();
          }, 2000);
        } else {
          const message = document.createElement("div");
          message.classList.add("alert", "alert-warning", "mt-3");
          message.textContent = "Producto ya se encuentra en favoritos";
          modalFooter.appendChild(message);
          setTimeout(() => {
            message.remove();
          }, 2000);
        }
      }
    });
  }

  //BUSCADOR de productos

  if (searchButton) {
    const search = document.getElementById("search");
    const results = document.getElementById("selected-productos");

    searchButton.addEventListener("click", function () {
      const searchValue = search.value;

      if (!searchValue) {
        alert("Por favor, introduce el nombre del producto");
        return;
      }
      fetch("../php/getAll.php?name=" + searchValue)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
          }
          return response.json();
        })
        .then((productos) => {
          // Handle the response as an array of products

          // Clear the results and table body before adding new data
          results.innerHTML = "";
          resultsTableBody.innerHTML = "";

          if (productos.length === 0) {
            results.textContent = "No se encontraron productos.";
          } else {
            // Display JSON in results
            results.textContent = JSON.stringify(productos, null, 4);

            // Add products to the table
            productos.forEach((producto) => {
              const newRow = document.createElement("tr");
              const newName = document.createElement("td");
              const newDescription = document.createElement("td");
              const newPrice = document.createElement("td");
              const newImage = document.createElement("td"); // Assuming you want to display an images

              newName.textContent = producto.name;
              newDescription.textContent = producto.description;
              newPrice.textContent = producto.price;

              // Create an images element and set its source
              const imgElement = document.createElement("img");
              imgElement.src = producto.images; // Use "images" from the product data
              imgElement.alt = producto.name;
              newImage.appendChild(imgElement); // Append the images to the <td>

              newRow.appendChild(newName);
              newRow.appendChild(newDescription);
              newRow.appendChild(newPrice);
              newRow.appendChild(newImage);
              resultsTableBody.appendChild(newRow);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al cargar los datos del producto.");
        });
    });
  }
  //Eliminar productos de la tabla

  deleteButton.addEventListener("click", function () {
    const selectedRow = resultsTableBody.querySelector("tr.selected");
    if (selectedRow) {
      selectedRow.remove();
      const message = document.createElement("div");
      message.textContent = "Producto eliminado correctamente.";
      message.classList.add("alert", "alert-success");
      message.setAttribute("role", "alert");
      results.appendChild(message);
    } else {
    message.textContent = "Por favor, selecciona un producto.";
    message.classList.add("alert", "alert-danger");
    message.setAttribute("role", "alert");
    results.appendChild(message);
    }

  });
  //SIMPLIFICADO
  sendButton.addEventListener("click", function () {
    const name = document.getElementById("validationDefault01").value;
    const description = document.getElementById("validationDefault02").value;
    const price = document.getElementById("validationDefault03").value;
    const images = document.getElementById("validationDefault04").value;

    if (!name || !description || !price || !images) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    fetch("../php/saveProduct.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, images }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        return response.json(); // Expect JSON from server
      })
      .then((data) => {
        alert("Producto guardado correctamente.");
        document.getElementById("validationDefault01").value = "";
        document.getElementById("validationDefault02").value = "";
        document.getElementById("validationDefault03").value = "";
        document.getElementById("validationDefault04").value = "";

        // Add the new product to the table
        const newRow = document.createElement("tr");
        const newName = document.createElement("td");
        const newDescription = document.createElement("td");
        const newPrice = document.createElement("td");
        const newImage = document.createElement("td");

        newName.textContent = name;
        newDescription.textContent = description;
        newPrice.textContent = price;

        const imgElement = document.createElement("img");
        imgElement.src = images;
        imgElement.alt = name;
        newImage.appendChild(imgElement);

        newRow.appendChild(newName);
        newRow.appendChild(newDescription);
        newRow.appendChild(newPrice);
        newRow.appendChild(newImage);
        resultsTableBody.appendChild(newRow);

        // Clear the results and table body before adding new data
        results.innerHTML = "";
        resultsTableBody.innerHTML = "";

        console.log("Success:", data.length);
        const message = document.createElement("div");
        message.textContent = "Producto guardado correctamente.";
        message.classList.add("alert", "alert-success");
        message.setAttribute("role", "alert");
        results.appendChild(message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  //Añadir productos

  const formulario = document.getElementById("addProductos");
  const formularioProducto = document.getElementById("formularioProducto");
  const boton = document.getElementById("añadirProducto");

  //El formulario está actualmente oculto desde css hay que hacerlo visible cuando pulso el botón añadir

  boton.addEventListener("click", function () {
    //No mostrar el resto de elementos de la página
    // document.getElementById("selected-productos").style.display = "none";
    document.getElementById("categorias").style.display = "none";
    document.getElementById("selectCat").style.display = "none";
    formulario.style.display = "block";
    formularioProducto.style.display = "block";
  });
});
