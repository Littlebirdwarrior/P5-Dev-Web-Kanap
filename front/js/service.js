//récupère l'adresse de l'API

/*
* Ces fonctions permettent de n'écrire l'adresse du serveur
* une seule fois dans tous les autres fichiers, sans avoir recours au fetch
* NB! : le <script>js/script.js</script> doit être rajouté à chaque page html,
* sinon loadConfig est "undefined".
* */

// Récupérer l'id dans l'URL (qui est stocké dans l'API)
const productId = new URL(location.href).searchParams.get("id");

// Récupérer un produit dans le panier (productInBasket) de l'API avec l'id
async function getOneProduct() {
    let config = await loadConfig();
    if (productId) {
        const response = await fetch(
            config.host + `/api/products/${productId}`
        );
        console.log("answer");
        //penser à convertir la string en json
        return await response.json();
    } else {
        console.error("id not found")
    }
}

async function loadConfig() {
    let result = await fetch("../config.json");
    //penser à convertir la string en json
    return result.json();
}
