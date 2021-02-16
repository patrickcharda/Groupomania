class CartView extends AbstractView {

    render() {
        let cart = this.getVariable("panier");

        let content = "";

        console.log(cart);

        if (Object.keys(cart).length == 0) {
            content = this.showNoProduct();
        } else {
            content = this.showCart(cart);
        }
        this.display(content);
    }

    /**
     * Affiche le contenu du panier. 
     * @param {object} cart 
     */
    showCart(cart) {
        content = `
                    <div class="panier">
                        <div class="contenuPanier">
        `;

        // Pour chaque élément du panier, on a la clef et le nombre d'item dedans. 
        for (const key in cart) {
            const currentTeddy = cart[key];
            
            content += `
                <div class="case">${currentTeddy.name}</div> 
                <div class="case">${currentTeddy.quantity}</div>
                <div class="case">
                    <button class="canBeClicked" onclick="router.execute('deleteCartItem', '${currentTeddy._id}')">
                        Supprimer du panier
                    </button>
                </div>
            
            `;
        }

        content += "    </div>";
        content += `    <button class="canBeClicked" onclick="router.execute('command')">Paser la commande</button>`;
        content += "</div>"

        return content;
    }

    /**
     * Affichage effectué lorsqu'il n'y a aucun produit dans le panier. 
     */
    showNoProduct() {
        content = `<div>Il n'y a aucun produit dans le panier.</div>`;

        return content;
    }

}