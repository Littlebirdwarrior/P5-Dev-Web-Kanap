/*
Insérer les produits dans la page d’accueil
* requêter l’API pour lui demander l’ensemble des produits ; récupérer la réponse émise.
* parcourir celle-ci pour insérer chaque élément (chaque produit) dans la page d’accueil (dans le DOM).
* */

////////////////////
//Fetch de l'API

/*
* Cette fonction permet de n'écrire l'adresse du serveur une seule fois dans le service.js,
* dans le fichier "service.js". Elle pourra ainsi être modifié automatiquement (voir service.js)
* * NB! : le <script>js/script.js</script> doit être rajouté à chaque page html,
* La fonction loadConfig() donne la variable config = résultat du fetch de l'API
* */

//l'asynchrone permet à au js de ne pas planter en attendant la promise
(async () => {
    //le try catch permet d'afficher un message personnalisé dans la console
    try{
        //soit config le resulat de load config
        loadConfig().then(config => {
            //config permet l'execution de getProducts() et displayProducts()
            getProducts(config).then(products => {
                displayProducts(products);
            })
        });
    }catch{
        console.log("le fetch de l'index ne marche pas")
    }
})();

const result = document.querySelector("#items");

////////////////////
// Récupérer les produits de l'API
async function getProducts(config) {
    console.log("calling");
    const response = await fetch(
        config.host + "/api/products/"
    );
    console.log("answer");
    return await response.json();
}

// Afficher les produits
function displayProducts(products) {
//Si products existe, alors il s'affiche dans le DOM
    if (products) {
        console.log("products called");
        result.innerHTML = products.map((product) => {
            return `
    <a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="${product.name}">${product.name}</h3>
      <p class="${product.description}">${product.description}</p>
    </article>
  </a>
    `;
        })
            .join("");

    } else {
        //sinon, la console renvois une erreur
        console.error("products not found")
    }
}



