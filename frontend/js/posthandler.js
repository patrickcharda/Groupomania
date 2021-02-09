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
            const apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/post/all": "https://bckend.herokuapp.com/api/furniture";
            var response = await Ajax.getAllPosts(apiUrl, bearer);
            //console.log('response.posts : '+response.posts[0].content);
            console.log(response);   
            var posts = JSON.stringify(response);
            console.log(typeof(posts));
            sessionStorage.setItem('posts', posts);
            //const test = sessionStorage.getItem('posts');
            //console.log(test);
            console.log(posts);
            //return true;
            document.location = './index.html';
        }
        catch(e) {
            console.log('dans display : ' +e);
            window.location.href = './warning.html';
        }
    }


    async modify(postId, postContent) {
        return;
    }

    async addPost(bearer, content) {
        console.log(content);
        console.log(bearer);
        this.content = content;
        this.bearer = bearer;
        try {
            const apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/post/newone": "https://bckend.herokuapp.com/api/furniture";
            console.log(apiUrl);
            var response = await Ajax.addPost(apiUrl, this.bearer, this.content);
            console.log(response);
            //const test = sessionStorage.getItem('posts');
            //console.log(test);
            //return true;
            document.location = './index.html';
        }
        catch(e) {
            console.log('dans display : ' +e);
            //window.location.href = './warning.html';
        }
    }        
}




