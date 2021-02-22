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
            this.showPosts(undefined);
            
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
        console.log(formData.get('image'));
        console.log(formData.get('content'));
        if (formData.get('img_remove') === 'on') {
            formData.set('img_remove', 'true');
        } else {
            formData.set('img_remove', 'false');
        }
        console.log(formData.get('img_remove'));
        let postId = this.args[2];
        try {
            let createdPost = await Model.updatePost(BASE_URL + "/post/" +postId+ "/updateByAdmin", token, formData);
            console.log(createdPost);
            this.showPosts();
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }

    }

    async showModifyPost() {
        let token = this.args[0].token;
        console.log(token);
        let formData = this.args[1];
        console.log(formData.get('image'));
        console.log(formData.get('content'));
        if (formData.get('img_remove') === 'on') {
            formData.set('img_remove', 'true');
        } else {
            formData.set('img_remove', 'false');
        }
        console.log(formData.get('img_remove'));
        let postId = this.args[2];
        try {
            let updatedPost = await Model.updatePost(BASE_URL + "/post/"+postId, token, formData);
            console.log(updatedPost);
            this.showPosts();
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

    async showComment() {
        let postRef = this.args[0];
        //console.log(postRef);
        let postId = postRef.postId;
        console.log('post id :' +postId);
        let user = JSON.parse(localStorage.getItem('user'));
        postRef.token = user.token;
        console.log(user.token);
        //récupérer tous les commentaires de ce post
        try {
            let allComments = await Model.getComments(BASE_URL + "/comment/" +postId+ "/view", user.token);
            let commentView = ViewFactory.getView("comment");
            commentView.addVariable('postRef', postRef);
            commentView.addVariable('allComments', allComments);
            commentView.render();
            }
            catch {
                let errorView = ViewFactory.getView("error");
                errorView.render();
            }


        

    }

    async showNewComment() {
        let user = this.args[0];
        let token = this.args[0].token;
        let content = this.args[1];
        let postId = this.args[2];
        let postRef = this.args[3];
        console.log(token);
        console.log(content);
        console.log(postId);

        try {
            let newCommentId = await Model.newComment(BASE_URL + "/comment/new", token, content, postId);
            console.log(newCommentId);

            //remettre le champ de formulaire à vide
            document.querySelector(`#newComment input[name="${postId}"]`).value='';

            //insérer ds la page le nouveau commentaire
            let divAllComments = document.getElementById('allComments');
            let divNewComment = document.createElement('div');
            divAllComments.appendChild(divNewComment);
            divNewComment.setAttribute('class','comment');
            divNewComment.setAttribute('id',`div${newCommentId}`);
            divNewComment.textContent = user.firstname+' '+user.lastname; 
            let commentForm = document.createElement('form');
            commentForm.setAttribute('id', 'comment'+newCommentId);
            divNewComment.appendChild(commentForm);
            let inputContent = document.createElement('input');
            inputContent.setAttribute('type', 'text');
            inputContent.setAttribute('name', 'content');
            let isAdmin ='';
            if (user.role == 'admin') {
                isAdmin = 'true';
            } else { isAdmin = 'false'}
            inputContent.setAttribute('admin', isAdmin);
            inputContent.setAttribute('value', content);
            commentForm.appendChild(inputContent);
            let btnUpdate = document.createElement('button');
            btnUpdate.setAttribute('type', 'submit');
            btnUpdate.setAttribute('name', 'button'+newCommentId);
            btnUpdate.setAttribute('form', 'comment'+newCommentId);
            btnUpdate.textContent = 'modifier';
            let delLink = document.createElement('a');
            delLink.setAttribute('href', '#');
            delLink.setAttribute('id', 'delLink'+newCommentId);
            delLink.setAttribute('admin', isAdmin);
            delLink.textContent = "supprimer";
            commentForm.appendChild(btnUpdate);
            commentForm.appendChild(delLink);

            //ajouter les gestionnaires d'evenements 
            
            console.log('TEST IS ADMIN :'+isAdmin);
            commentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const content = commentForm.querySelector('input[name="content"').value;
                console.log(content);
                router.execute('showCommentUpdate', newCommentId, content, isAdmin);
            });

            delLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                router.execute('showDeleteComment', newCommentId, isAdmin);
            })

        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showCommentUpdate() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        let commentId = this.args[0];
        let content = this.args[1];
        let isAdmin = this.args[2];
        console.log(isAdmin);
        if (isAdmin == 'false') {
            let updatedComment = await Model.updateComment(BASE_URL +"/comment/"+commentId+"/update", content, user.token);
            console.log(updatedComment);
            if (updatedComment.message == 'Comment was deleted successfully!') {
                console.log('disparu');
                const divCommentToDelete = document.getElementById('div'+commentId);
                divCommentToDelete.parentNode.removeChild(divCommentToDelete);
            }
        } else {
            let updatedComment = await Model.updateCommentByAdmin(BASE_URL +"/comment/"+commentId+"/updateByAdmin", content, user.token);
            console.log(updatedComment);
            if (updatedComment.message == 'Comment was deleted successfully!') {
                console.log('disparu');
                const divCommentToDelete = document.getElementById('div'+commentId);
                divCommentToDelete.parentNode.removeChild(divCommentToDelete);
            }
        }
        
    }

    async showDeleteComment() {
        let commentId = this.args[0];
        console.log(commentId);
        let isAdmin = this.args[1];
        console.log(isAdmin);
        let token = JSON.parse(localStorage.getItem('user')).token;
        console.log('token');
        
        try {
            var deletedComment='';
            if (isAdmin == 'false') {
                deletedComment = await Model.deleteComment(BASE_URL+'/comment/'+commentId+'/delete', token);
            } else {
                deletedComment = await Model.deleteComment(BASE_URL+'/comment/'+commentId+'/deleteByAdmin', token);
            }
            console.log(deletedComment.message);
            if (deletedComment.message === 'Comment was deleted successfully!') {
                let divCommentToDelete = document.getElementById('div'+commentId);
                divCommentToDelete.parentNode.removeChild(divCommentToDelete);
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