/* Consignes: Récupérer l’id du produit à afficher
* Utiliser url.searchParams.get
* Insérer un produit et ses détails dans la page Produit
* Récupérer les informations du produit depuis le back
* Afficher le produit selectionné, avec sa quantité et sa couleur.
* Rendre la quantité et la couleur modifiable.
* Envoyez le tout dans LS.
* */

////////////////
//mon fetch du produit cliqué sur l'index (voir service.js)

(async () => {
    try {
        getOneProduct(urlProductId).then(product => {
            displayProduct(product);
        });
    } catch {
        console.log("le fetch du product ne marche pas")
    }
})();

////////////////////////////
//----------------------------- Afficher le produits----------------------//

//j'établis mes constantes (pour sélectionner les élèments HTML)
const button = document.querySelector("button");
const result = document.querySelector(".item");

//je crée ma fonction pour afficher les produits
function displayProduct(product) {
    console.log("products called");
    if (product) {
        //j'injecte mon code dans le DOM
        //la fonction element.onclick permet de déclencher un évènement au click
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
// -------------------------------Créer mon panier-----------------------------//

/* Je dois créer un local storage où seront rangé les products choisis par l'utilisateur,
* mon panier dans le Local Storage est associé à la clé "basket"*/


// Création du localStorage
async function createBasket() {
    //les données dont j'ai besoin dans mon Local Storage
    const inputQuantity = document.querySelector("#quantity");
    const selectedColor = document.querySelector("select");

    //basket est le résultat de la fonction GET basket
    let basket = getBasket();

    //Je définis la variable foundProduct, qui est un produit dans basket dont l'id ET la couleur est égal au produit demandé
    let foundProduct = basket.find(p => p.id.localeCompare(urlProductId) === 0 && p.color.localeCompare(selectedColor.value) === 0);

    //je vérifie que la quantité rentré par l'utilisateur est positive
    let positiveQuantity = parseInt(inputQuantity.value);
    if (positiveQuantity <= 0) {
        //condition 1 : si la quantité est négative, il ne se passe rien
        console.log('la quantité est négative')
    } else if (!foundProduct) { //inverse de foundProduct
        //condition 2: si le produit n'est pas déjà ajouté, je crée un nouveau panier (dans le tableau basket) avec .push()
        basket.push({
            id: urlProductId, //attention à l'orthographe du _id
            quantity: positiveQuantity,
            color: selectedColor.value,
        });
        console.log("condition 1 : produit non ajouté, ok", positiveQuantity)
    } else {
        //condition 3: si le produit est deja ajouté, je récupère sa quantité sur la page
        foundProduct.quantity += positiveQuantity;
        console.log("condition 2: produit déjà ajouté, ok", positiveQuantity)
    }
    // un try catch permet d'identifier facilement l'erreur dans la console
    try {
        saveBasket(basket);
        console.log("basket is saved in LS")
    } catch (error) {
        console.log("basket is not saved in LS")
    }

}

//met des données en string dans le localstorage avec la clé basket
function saveBasket(basket) {
    console.log("createBasket");
    localStorage.setItem("basket", JSON.stringify(basket));
}

//permet de récupérer les choix de mon utilisateur
function getBasket() {
    //je crée une variable appelé 'basket' avec le contenu du localstorage à la clé 'basket'
    let basket = localStorage.getItem("basket");
    //dire que basket peut être "undefined" ou nul permet de ne pas faire cracher le js
    if (!basket || basket === "undefined") {
        /*on vérifie que l'on a récupéré quelque chose, si non, on fait un tableau vide,
        c'est important, car cela permet de créer un tableau à remplir*/
        return [];
    } else {
        /* sinon, on créé un panier en chaîne de caractère avec la méthode .parse() :
        * La méthode JSON.parse() analyse une chaîne de caractères JSON et construit
        * la valeur JavaScript ou l'objet décrit par cette chaîne.*/
        return JSON.parse(basket);
    }
}






