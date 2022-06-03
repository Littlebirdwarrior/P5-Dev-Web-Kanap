

/////////////////////
//------------------------Récupérer les données et les réenvoyé------------------//
//Je récupère les données de mon localStorage (mon fetch)
try {
    const basketContent = getBasket();
    console.log(basketContent)
    basketContent.forEach(p => displayBasket(p))
} catch (error) {
    console.log("basket is not load from LS", error)
}
//je lance mon reload de la page
displayTotalPrice();

//remet des données dans le localstorage avec la clé basket
function saveBasket(basket) {
    console.log("saveBasket");
    localStorage.setItem("basket", JSON.stringify(basket));
}
///////////////////////
//-----------------------Afficher le produit------------------//
//NB: "result" permet de selectionner l'endroit ou l'innerHTML s'affiche

/* imaginer une boucle qui génère du HTML pour chaque élément du panier:
* */
function displayBasket(basket) {
    //mon console.log vérifie le basket en entrée
    console.log(basket);
    const result = document.querySelector(".cart__items");
    if (basket) {
        result.innerHTML +=
            //le += permet d'ajouter les baskets les uns à la suite des autres
            ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${basket.imageUrl}" alt="${basket.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${basket.name}</h2>
                    <p>${basket.description}</p>
                    <p>${basket.color}</p>
                    <p>${basket.productPrice} €</p>
                    <p>total : ${basket.price}</p>
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

///////////////////////////
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

////////////////////
//------------------------Changer les quantité du panier-------------------//
//retirer un productInBasket du panier
function removeFromBasket(id, color) {
    console.log("Removed from basket : ", id, color);
    let basket = getBasket();
    //mon filtre laisse passer tous les élèment sauf celui cliqué
    basket = basket.filter(p => !(p.id.localeCompare(id) === 0 && p.color.localeCompare(color) === 0));
    saveBasket(basket);
    document.location.reload();
}
//Éditer le prix
/* appeler avec le onblur
 (dès que l'on clique ailleurs après avoir modifier le value, à la désélection)*/
function editQuantityBasket(newQuantity, id, color) {
    let basket = getBasket();
    //mon filtre ne laisse passer que l'élément choisi
    let foundProduct = basket.find(p => p.id.localeCompare(id) === 0 && p.color.localeCompare(color) === 0);
    console.log("newQuantity", newQuantity)
    if (newQuantity) {
        //Condition 1 : mon prix change, le multiplie le produit par la nouvelle quantité
        foundProduct.quantity = newQuantity;
        foundProduct.price = foundProduct.productPrice * foundProduct.quantity;
        console.log("nouveau prix", foundProduct);
    } else {
        //Condition 2 : mon prix ne change pas, la quantité égale 1
        foundProduct.quantity = 1;
        foundProduct.price = foundProduct.productPrice;
        console.log("prix 1", foundProduct);
    }
    saveBasket(basket);
    document.location.reload();

}

// selectionner avec le enter, il n'y a pas d'évenement spécifique pour ça
// on en crée un évènement sur l'element enter
function onEnter(key, newQuantity, id, color) {
    // il ne se passe rien tant que le key n'est pas ce que je veux
    if (key === "Enter") {
        editQuantityBasket(newQuantity, id, color)
    }
}


// Calculer la quantité
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let basketElement of basket) {
        number += basketElement.quantity;
    }
    return number;
}

//Calculer le le total
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let basketElement of basket) {
        total += basketElement.price;
    }
    console.log("total")
    return total;
}

//Afficher  total
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
////////////////////////
//Le formulaire

// Accédez à l'élément form …
let myForm = document.getElementById("cart__order__form");

// … et prenez en charge l'événement submit.
myForm.addEventListener("submit", async function (e) {

    let myEmail = document.getElementById('email');
    let myCity = document.getElementById('city');
    let myAddress = document.getElementById('address');
    let myLastName = document.getElementById('lastName');
    let myFirstName = document.getElementById('firstName');

    // mes regex
    let regexEmail = new RegExp(
        "^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        "g");
    let regexLastName = new RegExp("^[a-zA-Zàâéèëêïîôùüç -]{1,60}$", "g");
    let regexFirstName = new RegExp("^[a-zA-Zàâéèëêïîôùüç -]{1,60}$", "g");
    let regexCity = new RegExp("^[a-zA-ZÀ-ÿ, ]+(?:[\\s-][a-zA-Z]+)*$", "g");
    let regexAddress = new RegExp("^[a-zA-ZÀ-ÿ0-9\\s,'-]*$", "g");

    e.preventDefault();

    let error = false;

    if (myEmail.value.trim() === "") {
        let myError = document.getElementById('emailErrorMsg');
        myError.innerHTML = "Cet élément est requis";
        myError.style.color = 'orange';
        error = true;
    } else if (regexEmail.test(myEmail.value) === false) {
        let myError = document.getElementById('emailErrorMsg');
        myError.innerHTML = "Votre adresse mail est invalide";
        error = true;
    } else {
        let myError = document.getElementById('emailErrorMsg');
        myError.innerHTML = "";
    }

    if (myFirstName.value.trim() === "") {
        let myError = document.getElementById('firstNameErrorMsg');
        myError.innerHTML = "Cet élément est requis";
        myError.style.color = 'orange';
        error = true;
    } else if (regexFirstName.test(myFirstName.value) === false) {
        let myError = document.getElementById('firstNameErrorMsg');
        myError.innerHTML = "Votre prénom contient un caractère défendu";
        error = true;
    } else {
        let myError = document.getElementById('firstNameErrorMsg');
        myError.innerHTML = "";
    }

    if (myLastName.value.trim() === "") {
        let myError = document.getElementById('lastNameErrorMsg');
        myError.innerHTML = "Cet élément est requis";
        myError.style.color = 'orange';
        error = true;
    } else if (regexLastName.test(myLastName.value) === false) {
        let myError = document.getElementById('lastNameErrorMsg');
        myError.innerHTML = "Votre nom contient un caractère défendu";
        error = true;
    } else {
        let myError = document.getElementById('lastNameErrorMsg');
        myError.innerHTML = "";
    }

    if (myCity.value.trim() === "") {
        let myError = document.getElementById('cityErrorMsg');
        myError.innerHTML = "Cet élément est requis";
        myError.style.color = 'orange';
        error = true;
    } else if (regexCity.test(myCity.value) === false) {
        let myError = document.getElementById('cityErrorMsg');
        myError.innerHTML = "Votre prénom contient un caractère défendu";
        error = true;
    } else {
        let myError = document.getElementById('cityErrorMsg');
        myError.innerHTML = "";
    }

    if (myAddress.value.trim() === "") {
        let myError = document.getElementById('addressErrorMsg');
        myError.innerHTML = "Cet élément est requis";
        myError.style.color = 'orange';
        error = true;
    } else if (regexAddress.test(myAddress.value) === false) {
        let myError = document.getElementById('addressErrorMsg');
        myError.innerHTML = "Votre prénom contient un caractère défendu";
        error = true;
    } else {
        let myError = document.getElementById('addressErrorMsg');
        myError.innerHTML = "";
    }

    if (error === true) {
        return
    }

    //après être aller voir ce qui est attendu dans le back
    //parceque requete post
    let body = {
        contact: {
            email: myEmail.value,
            city: myCity.value,
            address: myAddress.value,
            lastName: myLastName.value,
            firstName: myFirstName.value,
        },
        products: getProductsFromBasket()
    };

    const order = await postOrder(body);
    window.location.href = `../html/confirmation.html?id=${order.orderId}`;
});

function getProductsFromBasket() {
    let basket = getBasket();
    let products = [];

    basket.forEach(b => {
        for (let i = 1; i <= b.quantity; i++) {
            products.push(b.id)
        }
    });

    return products;
}

async function postOrder(body) {

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    let config = await loadConfig()
    const response = await fetch(config.host + '/api/products/order', options);
    return await response.json();
}

