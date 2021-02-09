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
        /* si localStorage de session existe, afficher les posts */
        var bearer = sessionStorage.getItem("bearer");
        if (bearer) {
            // afficher les posts
            console.log('token '+bearer);
            let posts = sessionStorage.getItem('posts');
            const newPostBtn = document.createElement('button');
            newPostBtn.textContent = 'ajouter un post';

            newPostBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.addPostForm();
            });


            const main= document.getElementById('main');
            main.appendChild(newPostBtn);
            if (posts) {
                console.log('allPosts : '+posts);
                posts = JSON.parse(posts);
                console.log('type of posts' + typeof(posts));
                var postsDiv = document.createElement('div');
                for (let post of posts) {
                    console.log(post.content);
                    const identiteDiv = document.createElement('div');
                    identiteDiv.textContent = post.firstname+' '+post.lastname;
                    const contentTextarea = document.createElement('textarea');
                    contentTextarea.textContent = post.content;
                    const userId = sessionStorage.getItem('userId');
                    console.log(userId);
                    console.log(post.user_id);
                    contentTextarea.textContent += ' '+post.user_id+' ';
                    contentTextarea.textContent += +post.id+' ';
                    const addCommentBtn = document.createElement('button');
                    addCommentBtn.textContent = 'commenter';
                    addCommentBtn.setAttribute('id','p_id'+post.id);
                    if (userId != post.user_id) {
                        contentTextarea.setAttribute('readonly', 'true');
                        postsDiv.appendChild(identiteDiv);
                        postsDiv.appendChild(contentTextarea);
                        postsDiv.appendChild(addCommentBtn);
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
                        postsDiv.appendChild(identiteDiv);
                        postsDiv.appendChild(contentTextarea);
                        postsDiv.appendChild(addCommentBtn);
                        postsDiv.appendChild(modifyButton);

                    }
                }
                //postsDiv.textContent = posts;
                
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
        //main.textContent='toto';

        const signupForm = document.createElement('form');
        signupForm.setAttribute('id', 'signupForm');
        signupForm.setAttribute('method', 'POST');

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
        signupForm.appendChild(formGroupDiv1);

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
        signupForm.appendChild(formGroupDiv2);

        const formGroupDiv4 = document.createElement('div');
        formGroupDiv4.setAttribute('class', 'formGroup');
        
        const label4 = document.createElement('label');
        label4.setAttribute('for', 'userFistname');
        label4.textContent = ' Prénom : '
        formGroupDiv4.appendChild(label4);

        const inputFirstname = document.createElement('input');
        inputFirstname.setAttribute('type', 'text');
        inputFirstname.setAttribute('id', 'userFirstname');
        formGroupDiv4.appendChild(inputFirstname);
        signupForm.appendChild(formGroupDiv4);

        const formGroupDiv5 = document.createElement('div');
        formGroupDiv5.setAttribute('class', 'formGroup');
        
        const label5 = document.createElement('label');
        label5.setAttribute('for', 'userLastname');
        label5.textContent = ' Nom : '
        formGroupDiv5.appendChild(label5);

        const inputLastname = document.createElement('input');
        inputLastname.setAttribute('type', 'text');
        inputLastname.setAttribute('id', 'userLastname');
        formGroupDiv5.appendChild(inputLastname);
        signupForm.appendChild(formGroupDiv5);

        const formGroupDiv3 = document.createElement('div');
        formGroupDiv3.setAttribute('class', 'formGroup');
        
        const button = document.createElement('button');
        button.setAttribute('id', 'buttonNewUser');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.userhandler.signup(inputMail.value, inputPwd.value,
                 inputFirstname.value, inputLastname.value);
        });
        button.textContent = 'signup';
        formGroupDiv3.appendChild(button);
        signupForm.appendChild(formGroupDiv3);

        main.appendChild(signupForm);

    }

    addPostForm() {
        const main = document.getElementById('main');
        this.removeAllChildNodes(main);
        
        const newPostForm = document.createElement('form');
        newPostForm.setAttribute('id', 'newPostForm');
        newPostForm.setAttribute('method', 'POST');
        newPostForm.setAttribute('enctype', '"multipart/form-data');

        const formGroupDiv1 = document.createElement('div');
        formGroupDiv1.setAttribute('class', 'formGroup');
        
        const label1 = document.createElement('label');
        label1.setAttribute('for', 'newContent');
        label1.textContent = 'contenu : '
        formGroupDiv1.appendChild(label1);

        const inputContent = document.createElement('input');
        inputContent.setAttribute('type', 'text');
        inputContent.setAttribute('id', 'newContent');
        formGroupDiv1.appendChild(inputContent);

        const formGroupDiv2 = document.createElement('div');
        formGroupDiv2.setAttribute('class', 'formGroup');
        
        const label2 = document.createElement('label');
        label2.setAttribute('for', 'newFile');
        label2.textContent = 'ajouter une image : '
        formGroupDiv2.appendChild(label2);

        const inputFile = document.createElement('input');
        inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('id', 'newFile');
        inputFile.setAttribute('name', 'files[]');
        inputFile.setAttribute('accept', 'image/*, .pdf');
        formGroupDiv2.appendChild(inputFile);

        const formGroupDiv3 = document.createElement('div');
        formGroupDiv3.setAttribute('class', 'formGroup');
        
        const button = document.createElement('button');
        button.setAttribute('id', 'buttonNewPost');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.posthandler.add(inputContent.value);
        });
        button.textContent = 'publier';
        formGroupDiv3.appendChild(button);

        newPostForm.appendChild(formGroupDiv1);
        newPostForm.appendChild(formGroupDiv2);
        newPostForm.appendChild(formGroupDiv3);

        main.appendChild(newPostForm);
    }
}

  

 