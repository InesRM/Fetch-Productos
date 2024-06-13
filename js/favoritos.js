window.addEventListener("load", function () {

  function cargarFavoritos() {
    const favoritosElement = document.querySelector("#favoritos");
    if (favoritosElement) {
      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; //Si no hay nada en el localstorage, se crea un array vacío
      favoritos.forEach((producto) => {
        if (producto) {
          const card = document.createElement("div");
          card.style.alignItems = "center";
          card.style.justifyContent = "center";
          card.style.display = "flex";
          card.style.margin = "10px";
          card.innerHTML = `
          <div class="card">
            <img src="../html/assets/img/${producto.images}" class="card-img-top" alt="${producto.name}">
          <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <p class="card-text">${producto.price} €</p>
                 <button class="btn btn-danger" data-dish-name="${producto.name}">Eliminar favorito</button>
        </div>
    </div>
    `;
          favoritosElement.appendChild(card);
        }
      });
    }
  }
  cargarFavoritos();

    function eliminarFavorito(name) {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const nuevoArray = favoritos.filter((producto) => producto.name !== name);
        localStorage.setItem("favoritos", JSON.stringify(nuevoArray));
        location.reload();
    }

    document.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const name = event.target.getAttribute("data-dish-name");
            eliminarFavorito(name);
        }
    });
});
