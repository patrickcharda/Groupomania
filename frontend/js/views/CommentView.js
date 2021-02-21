class CommentView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        let postRef = this.getVariable('postRef');
        let allComments = this.getVariable('allComments');

        console.log(postRef);
        console.log(allComments);
        
        let content = `
            <div>
                <div>
                    ${postRef.content}
                </div>
                <div>
                    `
                    if (postRef.image_url !='') {
                        content += `
                        <img src="${postRef.image_url}" width="75" height="130">
                        `;
                    }
        content +=`
                </div>
            </div>`;

            for (let i = 0; i < allComments.length; i++) {
                content += this.renderOneComment(allComments[i], user);
            }
        
        this.display(content);

        //this.formSubmit();
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }

    display(content) {
        this.container.innerHTML += content;
    }

    /*formSubmit() {
        const form = document.getElementById('loginForm');
        console.log(form.id);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = document.getElementById('userEmail');
            console.log(email.value)
            const password = document.getElementById('userPassword');
            console.log(password.value);
            router.execute('showLogged', email.value, password.value);
        })
    }*/
   
}