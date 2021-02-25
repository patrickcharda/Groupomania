class LoginView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        const signup = document.createElement('a');
        signup.setAttribute('href','#');
        signup.setAttribute('aria-label', 'page inscription');
        signup.textContent = "S'inscrire";
        divAccount.appendChild(signup);
        signup.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            //divAccount.removeChild(signup);
            router.execute('showSignup');
        });

        
        let content = `<form id="loginForm" method="post" aria-label="Formulaire de connexion">
                <div class='formGroup'>
                    <label for="userEmail">
                        Adresse de messagerie
                    </label>
                    <input type="email" id="userEmail" required maxlength="50" minlenght="8" placeholder="sophie.dupont@gpmania.com">
                </div>
                <div class="formGroup">
                    <label for="userPassword" placeholder="********">
                        Mot de passe
                    </label>
                    <input type="password" id="userPassword" required maxlength="16" minlength="8">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewUser" form='loginForm' aria-label="valider">
                        Valider
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
            const password = document.getElementById('userPassword');
            router.execute('showLogged', email.value, password.value);
        })
    }
   

}