class LoginView extends AbstractView {

    render() {
        
        let content = 
            `<form id='loginForm' method='post'>
                <div class='formGroup'>
                    <label for='userEmail'>
                        Adresse de messagerie
                    </label>
                    <input type='email' id='userEmail' required maxlength="50" minlenght="8">
                </div>
                <div class='formGroup'>
                    <label for='userPassword'>
                        Mot de passe
                    </label>
                    <input type='password' id='userPassword' required maxlength="16" minlength="8">
                </div>
                <div class='formGroup'>
                    <button id="btnNewUser">
                        ok
                    </button>
                </div>
            </form> `;
        
        this.display(content);
    }

}