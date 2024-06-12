const productosData = {
    "categorias": [
        {"title":"Sciencie-Fiction-Movie","description":"Ciencia Ficción"},
        {"title":"Terror-Movie","description":"Películas de Miedo"},
        {"title":"Comedy-Movie","description":"Películas de Comedia"},
        {"title":"Rock","description":"Variedad de Música Rock (Álbum)"},
        {"title":"Cambio","description":"Música Clásica (Álbum)"},
        {"title":"Pop-Music","description":"Música Pop (Álbum)"},
        {"title":"Mangas","description":"Libros Tipo Mangas"},
        {"title":"Comics","description":"Libros Tipo Comic"},
        {"title":"Default-Book","description":"Libros por Defecto"}
       ],
    "productos": {
        "Books": [
           {"serialNumber":"111", "name":"El Señor de los Anillos", "description":"Resumen", "price":"20$", "tax":"21%", "images":"../../html/assets/img/products/elSeñorDeLosAnillos.jpg", "isbn":"756-3-16-198710-0", "author":"J. R. R. Tolkien", "pages":"600","cat":"Default-Book","cif":"200"},
           {"serialNumber":"222", "name":"Los Pilares de la Tierra", "description":"Resumen", "price":"22$", "tax":"21%", "images":"../../html/assets/img/products/pilaresTierra.jpg", "isbn":"879-3-16-198710-0", "author":"Ken Follett", "pages":"700","cat":"Default-Book","cif":"200"},
           {"serialNumber":"666", "name":"Jujutsu Kaisen", "description":"Resumen", "price":"8$", "tax":"21%", "images":"../../html/assets/img/products/Jujutsu_kaisen.jpg", "isbn":"978-3-16-198710-0", "author":"Gege Akutami", "pages":"500","cat":"Mangas","cif":"300"},
           {"serialNumber":"777", "name":"Ataque a los Titanes", "description":"Resumen", "price":"8$", "tax":"21%", "images":"../../html/assets/img/products/attackontitan.png", "isbn":"178-3-16-148510-0", "author":"Hajime Isayama", "pages":"100","cat":"Mangas","cif":"300"},
           {"serialNumber":"888", "name":"Demon Slayer", "description":"Resumen", "price":"8$", "tax":"21%", "images":"../../html/assets/img/products/demonSlayer.jpg", "isbn":"378-3-16-116410-0", "author":"Koyoharu Gotouge", "pages":"110","cat":"Mangas","cif":"400"},
           {"serialNumber":"999", "name":"SpiderMan", "description":"Resumen", "price":"7$", "tax":"21%", "images":"../../html/assets/img/products/spiderman.jpg", "isbn":"487-3-16-116410-0", "author":"Marvel Comics", "pages":"120","cat":"Comics","cif":"666"},
           {"serialNumber":"123", "name":"X-Men", "description":"Resumen", "price":"6$", "tax":"21%", "images":"../../html/assets/img/products/xmen.jpg", "isbn":"521-3-16-116410-0", "author":"Marvel Comics", "pages":"80","cat":"Comics","cif":"400"}
   
        ],
        "Music": [
           {"serialNumber":"333", "name":"AM", "description":"Álbum", "price":"10$", "tax":"21%", "images":"../../html/assets/img/products/arcticMonkeys.jpg","singer":"Artic Monkeys","musicalGenre":"Rock","songsNumber":"8","cat":"Rock","cif":"400"},
           {"serialNumber":"444", "name":"La Novena Sinfonía", "description":"Álbum", "price":"8$", "tax":"21%", "images":"../../html/assets/img/products/novenaSinfonia.jpg","singer":"Beethoven","musicalGenre":"Classical","songsNumber":"10","cat":"Cambio","cif":"666"},
           {"serialNumber":"555", "name":"Happier Than Ever", "description":"Álbum", "price":"12$", "tax":"21%", "images":"../../html/assets/img/products/happierThanEver.jpg","singer":"Billie Eilish","musicalGenre":"Pop","songsNumber":"6","cat":"Pop-Music","cif":"300"}
   
        ],
        "Movie": [
           {"serialNumber":"456", "name":"IT", "description":"Resumen Terror", "price":"18$", "tax":"21%", "images":"../../html/assets/img/products/it.jpg","director":"Andrés Muschietti","year":"2017","duration":"2h 15min","cat":"Terror-Movie","cif":"666"},
           {"serialNumber":"789", "name":"DeadPool", "description":"Resumen Comedia", "price":"20$", "tax":"21%", "images":"../../html/assets/img/products/deadpool.jpg","director":"Tim Miller","year":"2016","duration":"1h 48min","cat":"Comedy-Movie","cif":"300"},
           {"serialNumber":"213", "name":"Star Wars", "description":"Guerra de las Galaxias", "price":"12$", "tax":"21%", "images":"../../html/assets/img/products/starWars.jpeg","director":"George Lucas","year":"1980","duration":"2h 50min","cat":"Sciencie-Fiction-Movie","cif":"400"},
           {"serialNumber":"435", "name":"Harry Potter y el prisionero de Azkaban", "description":"Cosas mágicas", "price":"20$", "tax":"21%", "images":"../../html/assets/img/products/harrypotter.jpg","director":"Alfonso Cuarón","year":"2004","duration":"2h 19min","cat":"Sciencie-Fiction-Movie","cif":"200"},
           {"serialNumber":"678", "name":"Avatar", "description":"Resumen Ciencia Ficción", "price":"17$", "tax":"21%", "images":"../../html/assets/img/products/avatar.png","director":"James Cameron","year":"2007","duration":"2h 49min","cat":"Sciencie-Fiction-Movie","cif":"666"}
   
        ]
    },
    "tiendas": [
       {"cif":"200","name":"Corte Inglés","address":"Gran Vía","phone":"789456123","coords":{"latitude":"2","longitude":"2"},"photos":"../../html/assets/img/el-corte-ingles-logo.jpg"},
       {"cif":"300","name":"Serendipia","address":"Calle Altagracia","phone":"989456123","coords":{"latitude":"3","longitude":"3"},"photos":"../../html/assets/img/Serendipia.jpg"},
       {"cif":"400","name":"Fnac","address":"Gran Vía","phone":"657456123","coords":{"latitude":"4","longitude":"4"},"photos":"../../html/assets/img/fnac.jpg"}
   
    ]
        
   
   }

   export default productosData;