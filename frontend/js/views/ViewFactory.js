// Ici, on transforme la vue en abstract view qui va contenir la base
// De quoi stocker les variables, de quoi faire le rempalcement 
// automatique, ainsi que la methode render. 
// Puis chaque vue (une par page) aura le détail du contenu.
// Une foisl e systeme mis en place, ca devrait aller vite...

class ViewFactory {

    constructor() {
        throw new TypeError("Erreur dans view Factory, merci d'utiliser la méthode 'getView'.");
    }

    static getView(viewName) {
        switch (viewName) {
            case "listProduct":
                return new ListProductView();
            case "detailProduct": 
                return new DetailProductView();
            case "cart":
                return new CartView();
            case "login":
                return new LoginView();
            case "error":
                return new ErrorView();
            default:
                throw new TypeError(`La vue (${viewName} n'existe pas.`);
        }
    }

  
}