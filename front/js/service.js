//récupère l'adresse de l'API

/*
* Ces fonctions permettent de n'écrire l'adresse du serveur
* une seule fois dans tous les autres fichiers, sans avoir recours au fetch
* NB! : le <script>js/script.js</script> doit être rajouté à chaque page html,
* sinon loadConfig est "undefined".
* */

// Récupérer l'id dans l'URL (qui est stocké dans l'API)
const productId = new URL(location.href).searchParams.get("id");

/*La déclaration async function définit une fonction asynchrone :
une fonction qui s'exécute de façon asynchrone grâce à la boucle d'évènement en utilisant
une promesse (Promise) comme valeur de retour. L'asynchrone permet à au js de ne pas planter en attendant la promise,
la méthode .then() renvoie la promise et bloque l'asynchrone. La méthode await fait a peu près la même chose */


// Récupérer un produit dans le panier (productInBasket) de l'API avec l'id
async function getOneProduct() {
    let config = await loadConfig();
    if (productId) {
        const response = await fetch(
            config.host + `/api/products/${productId}`
        );
        console.log("answer");
        return await response.json();
        //autre grammaire, au cas où on ne veut pas d'asynchrone :
        // response.json().then(result => {
        //     return result
        // });
    } else {
        console.error("id not found")
    }
}

async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();//penser à convertir la string en json
}
