//mon fetch du produit cliqué sur la home
(async () => {
    //faire en sorte que l'adresse du serveur puisse être modifié automatiquement
    try {
        getOneProduct().then(products => {
            displayProducts(products);
        });
    } catch {
        console.log("le fetch du product ne marche pas")
    }
})();

////////////////////////////
// Afficher le produits

//j'établis mes constantes
const button = document.querySelector("button");
const result = document.querySelector(".item");

//je crée ma fonction
function displayProducts(product) {
    console.log("products called");
    if (product) {
        result.innerHTML =
            `<article>
            <div class="item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>Prix : <span id="price">${product.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${product.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                    <option value="" disabled="disabled">--SVP, choisissez une couleur --</option>
                    <option value="vert">vert</option>
                    <option value="blanc">blanc</option>
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input id="quantity" type="number" name="itemQuantity" min="1" max="100" value="1">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart" onclick="createBasket()">Ajouter au panier</button>
              </div>

            </div>
          </article>
        `

    } else {
        console.error("products not found")
    }
}

///////////

//LE PANIER --> Basket
//je dois créer un local storage ou seront rangé les products choisis par l'utilisateur

// Création du localStorage
async function createBasket() {
    const inputQuantity = document.querySelector("#quantity");
    const product = await getOneProduct();
    console.log("createBasket", product)
    const selectedColor = document.querySelector("select");

    let basket = getBasket();
    //Je définis la variable foundProduct, qui est un produit dans basket dont l'id
    // ET la couleur est égal au produit demandé
    //cela sert à ne pas ajouter 2 fois la même requête (cela s'appelle un prédicat)
    //pour la couleur, c'est compliqué car il faut comparer des strings (et non des nombres),
    // la méthode localeCompare permet de dire si A=B égal 0 équivault à A=B ou si A=B=1 équivaut à A!=B
    let foundProduct = basket.find(p => p.id.localeCompare(product._id) === 0 && p.color.localeCompare(selectedColor.value) === 0);
    console.log(basket, foundProduct);
    //si c'est l'inverse de foundProduct
    if (!foundProduct) {
        //condition 1: si le produit n'est pas déjà ajouté, je crée un nouveau panier
        basket.push({
            id: product._id,
            //parseInt, comme le parseFloat, transforme un string en nombre entier
            quantity: parseInt(inputQuantity.value),
            description: product.description,
            color: selectedColor.value,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price * parseInt(inputQuantity.value),
            productPrice: product.price
        });
        console.log("condition 1 : ok")
    } else {
        //condition 2: si le produit est deja ajouté, je récupère sa quantité sur la page
        foundProduct.quantity += parseInt(inputQuantity.value);
        foundProduct.price = product.price * foundProduct.quantity;
        console.log("condition 2: ok")
    }
    try {
        saveBasket(basket);
        console.log("basket is saved in LS")
    } catch (error) {
        console.log("basket is not saved in LS")
    }

}

//met des données dans le localstorage avec la clé basket
function saveBasket(basket) {
    console.log("createBasket");
    localStorage.setItem("basket", JSON.stringify(basket));
}

//permet de récupérer les choix de mon utilisateur
function getBasket() {
    //je crée une variable appelé 'basket' avec le contenu du localstorage à la clé 'basket'
    let basket = localStorage.getItem("basket");
    //on vérifie que l'on a récupéré quelque chose, si non, on fait un tableau vide,
    //c'est important, car cela permet de créer un tableau à remplir
    if (!basket || basket === "undefined") {
        return [];
    } else {
        // sinon, on créer un panier
        return JSON.parse(basket);
    }
}






