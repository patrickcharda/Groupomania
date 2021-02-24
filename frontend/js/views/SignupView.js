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
        divAccount.appendChild(signin);
        signin.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showLogin');
        });
        
  
        let content = 
        `<form id="signupForm" method="post">
            <div class="formGroup">
                <label for="firstname">
                    Prénom
                </label>
                <input type="text" id="firstname" required maxlength="20" minlength="2" required>
            </div>
            <div class="formGroup">
                <label for="lastname">
                    Nom
                </label>
                <input type="text" id="lastname" required maxlength="25" minlength="2">
            </div>
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
                <button type="submit" id="btnNewUser" form='signupForm'>
                    Valider
                </button>
            </div>
        </form>`;
        
        this.display(content);

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
   

}