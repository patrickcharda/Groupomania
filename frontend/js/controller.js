/**
 * Le contrôleur est la classe qui va faire le lien entre les vues et les données.
 */
class Controller {

    constructor(args) {
        this.args = args;
        this.panier = [];
    }

    showLogin() {
        let loginView = ViewFactory.getView("login");
        loginView.render();
    }

    async showLogged() {
        // Amélioration : passer un nom pour reconnaitre l'arg qui va bien ? 
        let email = this.args[0];
        console.log(email);
        let password = this.args[1];
        console.log(password);
        let userLogged = await Model.login(BASE_URL + "/auth/login", email, password);
        this.showPosts(userLogged);
    }

    async showPosts(userLogged) {
        let token = userLogged.token;
        let postsView = ViewFactory.getView("allPostsView");
        postsView.addVariable("token", userLogged.token);
        postsView.addVariable("role", userLogged.role);
        postsView.render();
    }

    /**
     * Méthode qui gère la page de la liste des produits
     */
    async showListProduct() {
        // Première etapes, on reccupère les données qu'on veut afficher. 
        let listTeddies = await Model.get(BASE_URL + "/teddies");
        console.log(listTeddies);

        let listProductView = ViewFactory.getView("listProduct");
        listProductView.addVariable("listTeddies", listTeddies);
        listProductView.render();
    }

    /**
     * Méthode qui gère la page du détail d'un ourson. 
     */
    async showDetail() {
        // Amélioration : passer un nom pour reconnaitre l'arg qui va bien ? 
        let id = this.args[0];
        let teddy = await Model.get(BASE_URL + "/teddies/" + id);

        let productView = ViewFactory.getView("detailProduct");
        productView.addVariable("teddy", teddy);
        productView.render();
    }

    /**
     * Méthode qui gère l'affichage de la page panier. 
     */
    async showCart() {

        let panier = JSON.parse(localStorage.getItem("panier"));
        console.log("Dans showCart, liste des éléments du panier :");
        console.log(panier);

        let cartView = ViewFactory.getView("cart");
        cartView.addVariable("panier", panier);
        cartView.render();
    }

    /**
     * Rajoute un produit dans le panier.
     */
    async addTeddyToCart() {
        // On réccupère l'id de l'ourson qu'on veut passer. 
        let id = this.args[0];
        let teddy = await Model.get(BASE_URL + "/teddies/" + id);

        // On réccupère le panier. 
        //localStorage.clear();
        let panier = localStorage.getItem("panier");
        if (panier == null) {
            // S'il n'existe pas déjà, on l'initalise en créant un objet vide (pas un tableau
            // parce qu'on veut avoir des id d'oursons en clef et pas juste des chiffres). 
            panier = {};
        } else {
            // Sinon on parse la chaine JSON qu'on a pour obtenir notre collection. 
            panier = JSON.parse(panier);
        }
        console.log(panier);

        // On rajoute l'ourson actuel à la collection. 
        if (panier[id] == undefined) {
            teddy.quantity = 1;
            panier[id] = teddy;
            
        } else {
            panier[id].quantity += 1;
        }

        // Et finalement on stocke le tout. 
        localStorage.setItem("panier", JSON.stringify(panier));
        console.log(JSON.stringify(panier));
        alert(`Panier mis à jour !`);
    }

    /**
     * Cette méthode supprime un item du panier (pas de gestion de quantité ici, par simplification on supprime tout)
     */
    async deleteCartItem() {
        let id = this.args[0];
        
        let panier = localStorage.getItem("panier");
        panier = JSON.parse(panier);
        delete panier[id];

        localStorage.setItem("panier", JSON.stringify(panier));

        this.showCart();
    }

    /**
     * Création de la commande. 
     */
    async command() {
        alert("TODO creation de la commande");
    }

    /**
     * Méthode qui gère la page des erreurs. 
     */
    showError(errorMessage) {
        let errorView = ViewFactory.getView("error");

        errorView.addVariable("errorMessage", errorMessage);
        errorView.render();
    }
    
}