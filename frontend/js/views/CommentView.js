class CommentView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        
        let content = `<form id="loginForm" method="post">
                <div class='formGroup'>
                    <label for="userEmail">
                        Adresse de messagerie
                    </label>
                    <input type="email" id="userEmail" required maxlength="50" minlenght="8">
                </div>
                <div class="formGroup">
                    <label for="userPassword">
                        Mot de passe
                    </label>
                    <input type="password" id="userPassword" required maxlength="16" minlength="8">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewUser" form='loginForm'>
                        ok
                    </button>
                </div>
            </form>`;
        
        this.display(content);

        this.formSubmit();
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

    formSubmit() {
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
    }
   

}