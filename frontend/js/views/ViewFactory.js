class ViewFactory {

    constructor() {
        throw new TypeError("Erreur dans view Factory, merci d'utiliser la méthode 'getView'.");
    }

    static getView(viewName) {
        switch (viewName) {
            case "error":
                return new ErrorView();
            case "login":
                return new LoginView();
            case "allPostsView":
                return new AllPostsView();
            case "comment":
                return new CommentView();
            case "signup":
                return new SignupView();
            case "users":
                return new UsersView();
            default:
                throw new TypeError(`La vue (${viewName} n'existe pas.`);
        }
    }

  
}