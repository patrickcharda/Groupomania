class Display {
    constructor() {
        this.userhandler = new Userhandler;
        this.posthandler = new Posthandler;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
  
    welcome() {
        /* si localStorage session existe, alors l'utiliser pour le login
        et afficher les posts */
        var bearer = sessionStorage.getItem("bearer");
        if (bearer) {
            // afficher les posts
            console.log('token '+bearer);
            let posts = sessionStorage.getItem('posts');
            if (posts) {
                console.log('allPosts : '+posts);
                posts = JSON.parse(posts);
                console.log('type of posts' + typeof(posts));
                var postsDiv = document.createElement('div');
                for (let post of posts) {
                    console.log(post.content);
                    const contentTextarea = document.createElement('textarea');
                    contentTextarea.textContent = post.content;
                    const userId = sessionStorage.getItem('userId');
                    console.log(userId);
                    console.log(post.user_id);
                    contentTextarea.textContent += ' '+post.user_id+' ';
                    contentTextarea.textContent += +post.id+' ';
                    if (userId != post.user_id) {
                        contentTextarea.setAttribute('readonly', 'true');
                    }
                    else {
                        //le post est modifiable
                        const modifyButton = document.createElement('button');
                        modifyButton.setAttribute('id', post.id);
                        modifyButton.textContent = 'modifier'+post.id;
                        modifyButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            this.posthandler.modify(post.id, contentTextarea.value);
                            console.log(contentTextarea.value);
                        });
                        postsDiv.appendChild(modifyButton);

                    }
                    postsDiv.appendChild(contentTextarea);
                }
                //postsDiv.textContent = posts;
                const main= document.getElementById('main');
                main.appendChild(postsDiv);
            }
            else {
                this.posthandler.getAllPosts(bearer);
            }       
        }
        else {
            // affichier choix : inscription ou login
            const welcomeDiv = document.createElement('div');
            welcomeDiv.setAttribute('id', 'welcome');
            const loginDiv = document.createElement('div');
            loginDiv.setAttribute('id', 'login');
            const loginA = document.createElement("a");
            loginA.setAttribute("href", "#");
            loginA.textContent='se connecter';
            loginA.addEventListener('click', (event) => {
                event.preventDefault();
                this.loginForm();
            });
            loginDiv.appendChild(loginA);
            const signupDiv = document.createElement('div');
            signupDiv.setAttribute('id', 'signup');
            const signupA = document.createElement('a');
            signupA.setAttribute("href", '#');
            signupA.textContent='s\'enregistrer'
            signupA.addEventListener('click', (event) => {
                event.preventDefault();
                this.signupForm();
            });
            signupDiv.appendChild(signupA);
            welcomeDiv.appendChild(loginDiv);
            welcomeDiv.appendChild(signupDiv);
            const main= document.getElementById('main');
            main.appendChild(welcomeDiv);
        }
    }  

    loginForm() {
        const main = document.getElementById('main');
        //main.removeChild(main.firstChild);
        this.removeAllChildNodes(main);

        const loginForm = document.createElement('form');
        loginForm.setAttribute('id', 'loginForm');
        loginForm.setAttribute('method', 'POST');

        const formGroupDiv1 = document.createElement('div');
        formGroupDiv1.setAttribute('class', 'formGroup');
        
        const label1 = document.createElement('label');
        label1.setAttribute('for', 'userEmail');
        label1.textContent = 'Adresse de messagerie : '
        formGroupDiv1.appendChild(label1);

        const inputMail = document.createElement('input');
        inputMail.setAttribute('type', 'email');
        inputMail.setAttribute('id', 'userEmail');
        formGroupDiv1.appendChild(inputMail);
        loginForm.appendChild(formGroupDiv1);

        const formGroupDiv2 = document.createElement('div');
        formGroupDiv2.setAttribute('class', 'formGroup');
        
        const label2 = document.createElement('label');
        label2.setAttribute('for', 'userPassword');
        label2.textContent = 'Mot de passe : '
        formGroupDiv2.appendChild(label2);

        const inputPwd = document.createElement('input');
        inputPwd.setAttribute('type', 'password');
        inputPwd.setAttribute('id', 'userPassword');
        formGroupDiv2.appendChild(inputPwd);
        loginForm.appendChild(formGroupDiv2);

        const formGroupDiv3 = document.createElement('div');
        formGroupDiv3.setAttribute('class', 'formGroup');
        
        const button = document.createElement('button');
        button.setAttribute('id', 'buttonNewUser');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.userhandler.login(inputMail.value, inputPwd.value);
        });
        button.textContent = 'login';
        formGroupDiv3.appendChild(button);
        loginForm.appendChild(formGroupDiv3);

        main.appendChild(loginForm);

    }
    signupForm() {
        const main = document.getElementById('main');
        this.removeAllChildNodes(main);
        main.textContent='toto';
    }

    
}

  

 