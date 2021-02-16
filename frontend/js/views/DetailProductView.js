class DetailProductView extends AbstractView {

    render() {
        let teddy = this.getVariable("teddy");
        let content = `
            <div class="detailOursonContainer">
                <div class="detailFicheOurson"">
                    <h2>${teddy.name}</h2>
                    <figure>
                        <img src="${teddy.imageUrl}" alt="Salut ${teddy.name}">
                        <figcaption>${teddy.description}</figcaption>
                    </figure>
                </div>

                <button type="button" onclick="router.execute('addTeddyToCart', '${teddy._id}')">Ajouter au panier !</button>
            </div>
        `;
        
        this.display(content);
    }

}