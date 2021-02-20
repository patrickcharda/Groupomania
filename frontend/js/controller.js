/**
 * Le contrôleur est la classe qui va faire le lien entre les vues et les données.
 */
class Controller {

    constructor(args) {
        this.args = args;
        this.panier = [];
    }

    async showLogin() {
        let loginView = ViewFactory.getView("login");
        loginView.render();
    }

    async showUsers() {
        let token = this.args[0];
        console.log(token);
        try {
            let allUsers = await Model.getAllUsers(BASE_URL + "/auth/getAllUsers", token);
            console.log(allUsers.users);
            let usersView = ViewFactory.getView("users");
            usersView.addVariable('allUsers', allUsers.users);
            usersView.render();
            }
            catch {
                let errorView = ViewFactory.getView("error");
                errorView.render();
            }
    }

    async showLogged() {
        
        let email = this.args[0];
        console.log('arg1 :'+email); 
        let password = this.args[1];
        console.log('arg2 :'+password);
        try {
        let userLogged = await Model.login(BASE_URL + "/auth/login", email, password);
        console.log('retour login bck :' +userLogged.token);
        this.showPosts(userLogged);
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }
    
    async showNewPost() {
        let token = this.args[0].token;
        let formData = this.args[1];
        try {
            let createdPost = await Model.newPost(BASE_URL + "/post/create", token, formData);
            console.log(createdPost);
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
        
    }

    async showUserRecord() {
        //console.log(this.args[0]);
        try {
            let createdUser = await Model.newUser(BASE_URL + "/auth/signup",
            this.args[0],
            this.args[1],
            this.args[2],
            this.args[3]);
            console.log(createdUser);
            this.showLogin()
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }

    }

    async showSignup() {
        let signupView = ViewFactory.getView("signup");
        signupView.render();
    }

    async showUserDelete() {
        let user = this.args[0];
        let token = user.token;
        console.log(token);
        let userIdToDelete = user.userId;
        console.log(userIdToDelete);
        //let user = JSON.parse(localStorage.getItem('user'));
        //console.log('user to delete'+userId);
        //console.log('user from storage, role :'+user.role);
        try {
            let messageResult = await Model.deleteUser(BASE_URL +`/auth/user/${userIdToDelete}/delete`, user);
            console.log(messageResult);
            if (messageResult.message === "User was deleted successfully!") {
                console.log('oyé');
                this.showLogin();
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showUserDeleteByAdmin() {
        let user = this.args[0];
        let token = user.token;
        console.log(token);
        let userIdToDelete = this.args[1];
        console.log(userIdToDelete);
        //let user = JSON.parse(localStorage.getItem('user'));
        //console.log('user to delete'+userId);
        //console.log('user from storage, role :'+user.role);
        try {
            let messageResult = await Model.deleteUser(BASE_URL +`/auth/user/${userIdToDelete}/deleteByadmin`, user);
            console.log(messageResult);
            if (messageResult.message === "User was deleted successfully!") {
                console.log('oyé');
                let nodeToDelete = document.getElementById("user"+userIdToDelete);
                nodeToDelete.parentNode.removeChild(nodeToDelete);
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showPosts(userLogged) {
        var user = '';
        if (userLogged == undefined) {
            console.log('undefined');
            user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
        }
        else {
            let token = userLogged.token;
            let role = userLogged.role;
            let userId = userLogged.userId;
            let email = userLogged.email;
            let firstname = userLogged.firstname;
            let lastname = userLogged.lastname;
            console.log(token);
            user = {
            "userId": userId,
            "role": role,
            "token": token,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "loggedFrom": new Date().getTime()
            }
            localStorage.setItem('user', JSON.stringify(user));
        }
        try {
            let allPosts = await Model.getPosts(BASE_URL + "/post/all", user);
            /*console.log('hasStorage :'+isLogged.hasStorage);
            if (isLogged.hasStorage == undefined) {
                localStorage.setItem('user', JSON.stringify(user));
            }*/
            //localStorage.setItem('user', JSON.stringify(user));
            //console.log(allposts);
            let allPostsView = ViewFactory.getView("allPostsView");

            allPostsView.addVariable("allPosts", allPosts);
            //allPostsView.addVariable("token", token);
            //allPostsView.addVariable("role", userLogged.role);
            //allPostsView.addVariable("userId", userLogged.userId);

            allPostsView.render();
            }
            catch {
                let errorView = ViewFactory.getView("error");
                errorView.render();
            }
        
    }

    async showModifyPostByAdmin() {
        let token = this.args[0].token;
        console.log(token);
        let formData = this.args[1];
        let postId = this.args[2];
        try {
            let createdPost = await Model.updatePostByAdmin(BASE_URL + "/post/" +postId+ "/updateByAdmin", token, formData);
            console.log(createdPost);
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }

    }

    async showModifyPost() {
        console.log('toto');
        let token = this.args[0].token;
        console.log(token);
        let formData = this.args[1];
        let postId = this.args[2];
        try {
            let updatedPost = await Model.updatePost(BASE_URL + "/post/" +postId, token, formData);
            console.log(updatedPost);
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
        
    }

    async showDeletePost() {
        let postId = this.args[0];
        let userId = this.args[1];
        let user = JSON.parse(localStorage.getItem('user'));
        console.log('post to delete'+postId);
        console.log('publisher of the post to delete :'+userId);
        console.log('user from storage, role :'+user.role);
        try {
            let messageResult = await Model.deletePost(BASE_URL +`/post/${postId}/${userId}/delete`, user);
            console.log(messageResult);
            if (messageResult.message === "Post was deleted successfully!") {
                console.log('oyé');
                let nodeToDelete = document.getElementById("card"+postId);
                nodeToDelete.parentNode.removeChild(nodeToDelete);
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showDeletePostByAdmin() {
        let postId = this.args[0];
        let userId = this.args[1];
        let user = JSON.parse(localStorage.getItem('user'));
        console.log('post to delete'+postId);
        console.log('publisher of the post to delete :'+userId);
        console.log('user from storage, role :'+user.role);
        try {
            let messageResult = await Model.deletePost(BASE_URL +`/post/${postId}/${userId}/deleteByAdmin`, user);
            console.log(messageResult);
            if (messageResult.message === "Post was deleted successfully!") {
                console.log('oyo');
                let nodeToDelete = document.getElementById("card"+postId);
                nodeToDelete.parentNode.removeChild(nodeToDelete);
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
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