/**
 * Ceci est une classe "abtraite", donc elle n'est pas censée être instanciée
 * directement. 
 * Elle fourni des méthodes de bases pour chaque vue, comme la création des 
 * variables que la vue pourra utiliser au besoin ou la méthode display
 * qui va s'occuper d'afficher ce que la vue a calculé, directement dans la page. 
 */
class AbstractView {

    constructor() {
        this.container = document.getElementById(CONTAINER_ID);
        this.listVariables = [];    
    }
    
    /**
     * Cette méthode permet de stocker une variable qui pourra être
     * utilisée par la vue. 
     * @param {string} name : le nom de la variable. 
     * @param {any} value : la valeur de la variable. 
     */
    addVariable(name, value) {
        this.listVariables[name] = value;
    }

    /**
     * Retourne le contenu d'une variable si elle existe, null sinon.
     * @param {string} name 
     */
    getVariable(name) {
        if (this.listVariables[name] != undefined) {
            return this.listVariables[name];
        }
        return null;
        
    }

    /**
     * Cette méthode est celle a appeler pour générer l'affichage. 
     * 
     * Doit être évidement être appelée uniquement depuis les classes filles. 
     */
    render() {
        throw new TypeError("Erreur dans ViewFactory, la méthode render ne doit être appelée que sur des classes filles !");
    }

    /**
     * Cette méthode se contente d'afficher le contenu dans la balise
     * prévue à cet effet. 
     * 
     * @param {string} content 
     */
    display(content) {
        this.container.innerHTML = content;
    }

    cleanContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}