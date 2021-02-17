class AllPostsView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();
        
        let content = `test`;
        
        this.display(content);

    }

    display(content) {
        this.container.innerHTML += content;
    }

}