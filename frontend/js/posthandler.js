class Posthandler {
    constructor() {
        this.ajax = new Ajax();
    }
    async getAllPosts(bearer) {
        /*const main = document.getElementById('main');
        const divTest = document.createElement('div');
        divTest.textContent = 'test';
        main.appendChild(divTest);*/
        console.log('mybearer : '+bearer);
        //récupérer les valeurs des champs
        //var posts = [];
        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/post/all": "https://bckend.herokuapp.com/api/furniture";
            var response = await Ajax.getAllPosts(apiUrl, bearer);
            console.log('response.posts : '+response.posts[0].content);
            
                var o = response; //objet à inspecter
                var result = [];
              
                for(o = response;
                    o !== null;
                    o = Object.getPrototypeOf(o)){
                  result = result.concat(Object.getOwnPropertyNames(o));
                }
                console.log('result '+result);
            var posts = JSON.stringify(response.posts);
            console.log(typeof(posts));
            sessionStorage.setItem('posts', posts);
            console.log(posts);
            return true;
        }
        catch(e) {
            console.log('dans display : ' +e);
            window.location.href = './warning.html';
        }
    }
    getAllPost(bearer) {
        console.log(bearer);
    }

}
