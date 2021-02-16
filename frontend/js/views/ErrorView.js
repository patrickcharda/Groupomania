class ErrorView extends AbstractView {

    /**
     * Affichage des messages d'erreur. 
     */
    render() {
        let errorMessage = this.getVariable("errorMessage");
        
        let content = `
            <div class="erreur">
                <div>Un problème s'est produit, veuillez ressayer utlérieurment.</div>
                <div class="erreurMessage">${errorMessage}</div>
            </div>
        `;
        
        this.display(content);
    }

}