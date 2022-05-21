
//Je récupère les données de mon localStorage
try{
    const basketContent = getBasket();
    console.log(basketContent)
    basketContent.forEach(p => displayBasket(p))
}catch (error){
    console.log("basket is not load from LS", error)
}

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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantity}">
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

function getBasket(){
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


//changer la quantité du panier
function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id === product.id);
    if (foundProduct !== undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }

}

// calculer la quantité
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    console.log("total")
    return total;
}

//Autre méthode
///////////////////////
//Tenir compte des instruction de la page product :
////////
// //je crée ma fonction de comptabilité à mon panier
// //je déclare des variables d'addition, de soustraction, et d'affichage du compte
// const counterDisplayElement = document.querySelector("#countDisplay");
// const counterMinusElement = document.querySelector("#removeOne");
// const counterPlusElement = document.querySelector("#addOne");
//
// //au début, le compte est à 0
// let count = 0;
//
// //j'affiche la valeur initiale
// function updateTotal() {
//   counterDisplayElement.innerHTML = count;
// }
// //si on clique, cela soustrait 1, seulement si le solde est inférieur à 1
// counterMinusElement.addEventListener("click", () => {
//   if (!count < 1) count--;
//   console.log("-1 produit")
//   //l'affichage évolue
//   updateTotal();
// });
// //si on clique, cela ajoute 1, sans condition
// counterPlusElement.addEventListener("click", () => {
//   console.log("+1 produit")
//   count++;
//   //l'affichage évolue
//   updateTotal();
// });
//
// //l'affichage du total évolue :
// // les changements sont affiché que les fonctions aie été utilisée ou non
// updateTotal();


