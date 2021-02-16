class ListProductView extends AbstractView {

    render() {
        let listTeddies = this.getVariable("listTeddies");
        let content = '';
        console.log(listTeddies);
        console.log(listTeddies.length);
        for (let i = 0; i < listTeddies.length; i++) {
            content += this.renderOneTeddy(listTeddies[i]);
        }
        this.display(content);
    }

    renderOneTeddy(currentTeddy) {
        
        let content = `
            <div class="ficheOurson canBeClicked" onclick="router.execute('showDetail', '${currentTeddy._id}')">
                <h2>${currentTeddy.name}</h2>
                <figure>
                    <img src="${currentTeddy.imageUrl}"
                         alt="Salut ${currentTeddy.name}">
                    <figcaption>${currentTeddy.description}</figcaption>
                </figure>
            </div>

        `;

        return content;
    }
}