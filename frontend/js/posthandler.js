class Posthandler {
    constructor() {
        this.ajax = new Ajax();
    }
    async getAllPosts(bearer) {
        const main = document.getElementById('main');
        const divTest = document.createElement('div');
        divTest.textContent = 'test';
        main.appendChild(divTest);
        console.log('mybearer : '+bearer);
        //récupérer les valeurs des champs
        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/post/all": "https://bckend.herokuapp.com/api/furniture";
            var response = await Ajax.getAllPosts(apiUrl, bearer);
            console.log(response);
        }
        catch(e) {
            console.log('dans display : ' +e);
            window.location.href = './warning.html';
            return;
        } 
    }
    getAllPost(bearer) {
        console.log(bearer);
    }

}
