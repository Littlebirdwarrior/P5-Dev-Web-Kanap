

(async () => {
  //faire en sorte que l'adresse du serveur puisse être modifié automatiquement
      getOneProduct().then(products => {
        displayProducts(products);
      });
})();

const button = document.querySelector("button");
const result = document.querySelector(".item");


// Afficher le produits

function displayProducts(product) {
  console.log("products called");
  if(product) {
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
                    <option value="">--SVP, choisissez une couleur --</option>
                    <option value="vert">vert</option>
                    <option value="blanc">blanc</option>
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>
        `

  } else {
    console.error("products not found")
  }

  const containerButton = document.getElementById("addToCart");
  console.log(containerButton)
  containerButton.addEventListener("click", createBasket);
}

///////////

//LE PANIER

// Création du localStorage
async function createBasket() {
  const inputQuantity = document.querySelector("#quantity");
  const product = await getOneProduct();
  console.log("createBasket", product)
  const select = document.querySelector("select");
  const basket = {
    id: product._id,
    quantity: parseInt(inputQuantity.value),
    color: select.value,
    name: product.name,
    imageUrl: product.imageUrl,
  };
  saveBasket(basket);
}

//met des données dans le localstorage avec la clé basket
function saveBasket(basket) {
  console.log("createBasket")
  localStorage.setItem("basket", JSON.stringify(basket));
}

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

// ajouter un produit au panier

function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(p => p.id === product.id);
  if (foundProduct !== undefined) {
    foundProduct.quantity ++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
}

//Pour plus tard
//retirer un produit du panier

function removeFromBasket(product) {
  let basket = getBasket();
  // a changer
  basket = basket.filter(p => p.id !== product.id);
  saveBasket(basket);
}

//changer la quantité du panier
function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find (p => p.id === product.id);
  if (foundProduct !== undefined) {
    foundProduct.quantity += quantity;
    if(foundProduct.quantity <=0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }

}

// calculer la quantité
function getNumberProduct(){
  let basket = getBasket();
  let number = 0;
  for(let product of basket) {
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
  return total;
}

