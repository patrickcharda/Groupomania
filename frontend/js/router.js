/**
 * Le routeur de l'application. 
 * 
 * C'est lui qui décide quel controleur lancer en fonction de la page qu'on lui a demandé d'afficher. 
 */
class Router {

    /**
     * Pour afficher une nouvelle page, il suffit de faire appel à cette méthode. 
     * 
     * L'appel à cette méthode se fait ainsi : 
     * routeur.showPage('nomDeLaPage', 'argument1', 'argument2');
     * En cas d'erreur (page inexistante ou problème dans le controlleur), 
     * c'est la page d'erreur qui est affichée. 
     * 
     * @param {string} page : le nom de la page visée. 
     * @param  {...any} args : la liste des arguments que l'on veut passer à cette page. 
     */
    async execute(page, ...args) {
        let controller = new Controller(args);

        // Try catch global pour bien attraper les erreurs/exceptions qui peuvent se produire dans le model. 
        try {
            switch (page) {
                case "showListProduct":
                    // A noter la présence du "await" pour permettre au "catch" de fonctionner. 
                    await controller.showListProduct();
                    break;

                case "showLogin":
                    await controller.showLogin();
                    break;

                case "showLogged":
                    await controller.showLogged();
                    break;

                case "showUserRecord":
                    await controller.showUserRecord();
                    break;
                
                case "showPosts":
                    await controller.showPosts();
                    break;
                
                case "showDeletePost":
                    await controller.showDeletePost();
                    break;
                
                case "showNewPost":
                    await controller.showNewPost();
                    break;

                case "showDeletePostByAdmin":
                    await controller.showDeletePostByAdmin();
                    break;

                case "showModifyPost":
                    await controller.showModifyPost();
                    break;

                case "showModifyPostByAdmin":
                    await controller.showModifyPostByAdmin();
                    break;

                case "showDetail":
                    await controller.showDetail();
                    break;

                case "showComment":
                    await controller.showComment();
                    break;
                
                case "showSignup":
                    await controller.showSignup();
                    break;

                case "showUsers":
                    await controller.showUsers();
                    break;
                
                case "showDeleteUser":
                    await controller.showUserDelete();
                    break;
                
                case "showUserDeleteByAdmin":
                    await controller.showUserDeleteByAdmin();
                    break;

                case "showCart": 
                    await controller.showCart();
                    break;

                case "addTeddyToCart":
                    await controller.addTeddyToCart();
                    break;
                
                case "deleteCartItem":
                    await controller.deleteCartItem();
                    break;

                case "command":
                    await controller.command();
                    break;

                default:
                    controller.showError("Route inconnue : " + page);
            }
        } catch (error) {
            controller.showError(error);
        }
    }
}