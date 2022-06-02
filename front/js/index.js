(async () => {
    //faire en sorte que l'adresse du serveur puisse être modifié automatiquement
    try{
        loadConfig().then(config => {
            getProducts(config).then(products => {
                displayProducts(products);
            })
        });
    }catch{
        console.log("le fetch de l'index ne marche pas")
    }
})();

const result = document.querySelector("#items");


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
        console.error("products not found")
    }
}



