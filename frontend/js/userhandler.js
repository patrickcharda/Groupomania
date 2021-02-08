class Userhandler {
    constructor() {
        this.ajax = new Ajax();
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    async login(mail, password) {
        /*const main = document.getElementById('main');
        const divTest = document.createElement('div');
        divTest.textContent = 'test';
        main.appendChild(divTest);
        console.log(mail);*/
        //récupérer les valeurs des champs
        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/auth/login": "https://bckend.herokuapp.com/api/furniture";
            var response = await Ajax.post(apiUrl, mail, password);
            console.log(response.token);
            sessionStorage.setItem('bearer', response.token);
            sessionStorage.setItem('userId', response.userId);
            document.location = './index.html';
        }
        catch(e) {
            console.log('dans display : ' +e);
            window.location.href = './warning.html';
        }
        
    }

}
