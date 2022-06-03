//Injecter le message dans le DOM
const orderId = document.querySelector("#orderId");
//récupérer l'id et l'afficher
const orderIdUrl = new URL(location.href).searchParams.get("id");
orderId.innerHTML = orderIdUrl;

// Suppression des produits du localStorage et du panier lorsque la commande est passée
localStorage.removeItem("basket");
