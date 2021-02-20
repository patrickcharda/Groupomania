class ErrorView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }
    /**
     * Affichage des messages d'erreur. 
     */
    render() {

        this.cleanContainer();

        let errorMessage = this.getVariable("errorMessage");
        
        let content = `
            <div class="erreur">
                <div>Un problème s'est produit, veuillez ressayer ultérieurement.</div>
                <div class="erreurMessage">${errorMessage}</div>
            </div>
        `;
        
        this.display(content);
    }

}