//Je récupère les données de mon localStorage
try {
    const basketContent = getBasket();
    console.log(basketContent)
    basketContent.forEach(p => displayBasket(p))
} catch (error) {
    console.log("basket is not load from LS", error)
}

displayTotalPrice();

//remet des données dans le localstorage avec la clé basket
function saveBasket(basket) {
    console.log("saveBasket");
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Afficher le produits
//result permet de selectionner l'endroit ou l'innerHTML s'affiche

//** imaginer une boucle qui le fait pour chaque éléments du panier
function displayBasket(basket) {
    console.log(basket);
    const result = document.querySelector(".cart__items");
    if (basket) {
        result.innerHTML +=
            ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${basket.imageUrl}" alt="${basket.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${basket.name}</h2>
                    <p>${basket.description}</p>
                    <p>${basket.color}</p>
                    <p>${basket.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input onblur="editQuantityBasket(value, '${basket.id}', '${basket.color}')" onkeydown="onEnter(event.key, value, '${basket.id}', '${basket.color}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <button onclick="removeFromBasket('${basket.id}', '${basket.color}')">Supprimer</button>
                    </div>
                  </div>
                </div>
              </article>
        `
    } else {
        console.error("panier non trouvé")
    }
}

// ------------------------- Basket section -------------------------------//
//sur ce fichier, la fonction getBasket n'existe pas et si j'exécute product.js,
//le fetch oneProduct est vide et crée une erreur, je dois donc le reproduire

function getBasket() {
    //je crée une variable appelé 'basket' avec le contenu du localstorage à la clé 'basket'
    let basket = localStorage.getItem("basket");
    //on vérifie que l'on a récupérer quelque chose, si non, on fait un tableau vide, sinon, on créer un panier
    if (basket === null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}


//Pour plus tard
//retirer un productInBasket du panier

function removeFromBasket(id, color) {
    console.log("Removed from basket : ", id, color);
    let basket = getBasket();
    basket = basket.filter(p => !(p.id.localeCompare(id) === 0 && p.color.localeCompare(color) === 0));
    saveBasket(basket);
    document.location.reload();
}

// appeler avec le onblur
// (dès que l'on clique ailleurs après avoir modifier le value, à la déselection)
function editQuantityBasket(newQuantity, id, color) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id.localeCompare(id) === 0 && p.color.localeCompare(color) === 0);
    if (newQuantity !== null) {
        //condition 2: si le produit est deja ajouté, je récupère sa quantité sur la page
        foundProduct.quantity = newQuantity;
        console.log("nouvelle quantité", foundProduct)
        foundProduct.price = foundProduct.price * foundProduct.quantity;
        console.log("nouveau prix", foundProduct);
    } else {
        //condition 2: si le produit est deja ajouté, je récupère sa quantité sur la page
        foundProduct.quantity = 0;
        console.log("quantité 0", foundProduct)
        foundProduct.price = 0;
        console.log("prix 0", foundProduct);
    }
    saveBasket(basket);
    document.location.reload();

}

// selectionner avec le enter, il n'y a pas d'évenement spécifique pour ça
// on en crée un sur l'element enter
function onEnter(key, newQuantity, id, color) {
    // il ne se passe rien tant que le key n'est pas ce que je veux
    if (key === "Enter") {
        editQuantityBasket(newQuantity, id, color)
    }
}


// calculer la quantité
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let basketElement of basket) {
        number += basketElement.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let basketElement of basket) {
        total += basketElement.quantity * basketElement.price;
    }
    console.log("total")
    return total;
}

function displayTotalPrice() {
    const result = document.querySelector(".cart__price");
    result.innerHTML +=
        `<p>Total (
            <span id="totalQuantity">${getNumberProduct()}
            </span> articles) : 
            <span id="totalPrice">${getTotalPrice()}</span> €
            </p> 
        `
}


