class Contact {
    constructor() {

    }

    inputNotOk(inputName, msg) {
        const divName = document.getElementById(inputName);

        //on supprime les éventuels précédents messages
        while (divName.nextElementSibling) {
            let div= divName.nextElementSibling;
            div.parentNode.removeChild(div);
        }

        const tmpDiv = document.createElement('div');
        tmpDiv.setAttribute('class', 'input-warning');
        tmpDiv.textContent = msg;
        divName.insertAdjacentElement('afterend', tmpDiv);
        //console.log('OUPS '+inputName);
    }

    inputSet(inputName) {
        var divInputName = document.querySelector('#'+inputName);
        console.log(divInputName);
        divInputName.addEventListener('click', function (e) {
            //console.log('test');
            //console.log(firstName.nextSibling);
            //console.log(firstName.nextElementSibling);
            //console.log(firstName.nextSibling);
            if (divInputName.nextElementSibling) {
                //console.log('ok');
                //console.log(divInputName.nextSibling);
                //console.log(divInputName.nextElementSibling);
                let div= divInputName.nextElementSibling;
                //console.log(div);
                div.parentNode.removeChild(div);
            }
        });
        divInputName.addEventListener('focusout', function (e) {
            //console.log(divInputName.value);
            if (divInputName.value === '') {
                this.inputNotOk(inputName, 'Veuillez renseigner ce champ');
                divInputName.setAttribute('class', 'form-control danger');
            } else {
                divInputName.setAttribute('class', 'form-control');
            }
        
        }.bind(this));
    }

    firstNameOk() {
        let prenom = document.getElementById("firstName");
        //console.log(prenom.value);
        let prenomRegex = /^[éèêôâïöA-Za-z-' ]{2,24}$/i;
        if (prenomRegex.test(prenom.value)) {
            return true;
        } else {
            this.inputNotOk('firstName', 'Champ prénom requis. Ne doit comporter que des caractères alphabétiques, des tirets, et des espaces.');
        }
    }

    lastNameOk() {
        let nom = document.getElementById("lastName");
        let nomRegex = /^[éèêôâïöA-Za-z-' ]{2,24}$/i;
        if (nomRegex.test(nom.value)) {
            return true;
        } else {
            this.inputNotOk('lastName', 'Champ nom requis. Ne doit comporter que des caractères alphabétiques, des tirets, et des espaces.');
        }
    }

    addressOk() {
        let adresse = document.getElementById("address");
        let addressRegex = /^[éèêôâïöA-Za-z0-9-,.'/ ]{2,49}$/;
        if (addressRegex.test(adresse.value)) {
            return true;
        } else {
            this.inputNotOk('address', 'Champ adresse requis. Caractères autorisés : lettres, chiffres, point, virgule, apostrophe et espaces.');
        }
    }

    cityOk() {
        let ville = document.getElementById("city");
        let villeRegex = /^[éèêôâïöA-Za-z-0-9/ ]{2,49}$/i;
        if (villeRegex.test(ville.value)) {
            return true;
        } else {
            this.inputNotOk('city', 'Champ ville requis. Ne doit comporter que des caractères alphabétiques, des tirets, et des espaces.');
        }
    }
    
    mailOk() {
        let mail = document.getElementById("email");
        let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
        if (mailRegex.test(mail.value)) {
            return true;
        } else {
            this.inputNotOk('email', 'Champ email requis. Doit correspondre à une adresse de messagerie valide.');
        }
    }

    verifyContact() {
        let p = this.firstNameOk();
        let n = this.lastNameOk();
        let a = this.addressOk();
        let c = this.cityOk();
        let m = this.mailOk();
        if (p && n && a && c && m) {
            return true;
        } else {
            /*let divFormIsNotOk = document.getElementById('formIsNotOk');
            let inputsNotOk ='';
            if (!p) {
                inputsNotOk +='<p>Le champ prénom est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces. </p>';
            }
            if (!n) {
                inputsNotOk +='<p>Le champ nom est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces.</p>';
            }
            if (!a) {
                inputsNotOk +='<p>Le champ adresse est obligatoire. </p>';
            }
            if (!c) {
                inputsNotOk +='<p>Le champ ville est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces. </p>';
            }
            if (!m) {
                inputsNotOk +='<p>Le champ email est obligatoire. Il doit correspondre à une adresse de messagerie correctement écrite.</p>';
            }
            divFormIsNotOk.innerHTML = inputsNotOk;*/
            return false;
        }
    }

    formatContact() {
        let objContact = {
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "email": document.getElementById("email").value
        }
        return (objContact);
    }

    supprimerMessages() {
        const divMessages = document.querySelector('#formIsNotOk');
        divMessages.innerHTML='';
    }

}