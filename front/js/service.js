//récupère l'adresse de l'API

// Récupérer l'id dans l'URL
const productId = new URL(location.href).searchParams.get("id");

// Récupérer un produit de l'API avec l'id
async function getOneProduct() {
    let config = await loadConfig();
    if (productId) {
        const response = await fetch(
            config.host + `/api/products/${productId}`
        );
        console.log("answer");
        return await response.json();
    } else {
        console.error("id not found")
    }
}

async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();
}
