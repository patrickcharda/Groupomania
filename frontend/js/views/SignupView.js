class SignupView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        const signin = document.createElement('a');
        signin.setAttribute('href','./../index.html');
        signin.textContent = "Se connecter";
        signin.setAttribute('aria-label', 'page de connexion');
        divAccount.appendChild(signin);
        signin.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showLogin');
        });
        
  
        let content = 
        `<form id="signupForm" method="post" aria-label="formulaire d'inscription" >
            <div class="formGroup">
                <label for="firstname">
                    Prénom
                </label>
                <input type="text" id="firstname" required maxlength="20" minlength="2" placeholder="Prénom" required>
            </div>
            <div class="formGroup">
                <label for="lastname">
                    Nom
                </label>
                <input type="text" id="lastname" required maxlength="25" minlength="2" placeholder="Nom">
            </div>
            <div class='formGroup'>
                <label for="userEmail">
                    Adresse de messagerie
                </label>
                <input type="email" id="userEmail" required maxlength="50" minlenght="8" placeholder="sophie.dupont@gpmania.com">
            </div>
            <div class="formGroup">
                <label for="userPassword">
                    Mot de passe
                </label>
                <input type="password" id="userPassword" required maxlength="16" minlength="8" placeholder="********" title="Le mot de passe doit contenir entre 8 et 16 caractères, dont 2 chiffres, 1 minuscule au moins et 1 majuscule. Ni espace ni caractères spéciaux.">
            </div>
            <div class="formGroup">
                <button type="submit" id="btnNewUser" form='signupForm' aria-label="valider">
                    Valider
                </button>
            </div>
        </form>`;
        
        this.display(content);

        //this.setValidityPasswordEvent();

        this.formSubmit();
    }

    display(content) {
        this.container.innerHTML += content;
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }

    formSubmit() {
        const form = document.getElementById('signupForm');
        console.log(form.id);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = document.getElementById('userEmail');
            const password = document.getElementById('userPassword');
            const firstname = document.getElementById('firstname');
            const lastname = document.getElementById('lastname');
            router.execute('showUserRecord', email.value, password.value, firstname.value, lastname.value);
        })
    }

    /*setValidityPasswordEvent() {
        var btnSubmit = document.getElementById('btnNewUser');
        btnSubmit.addEventListener('click', function() {
            var password = document.getElementById('userPassword');
            if (password.value.length < 8 || password.value.length > 16) {
                password.setCustomValidity("Le mot de passe doit contenir entre 8 et 16 caractères");
                paswword.dispatchEvent(new Event("invalid"));
            }
            password.reportValidity();
        })
    }*/
}