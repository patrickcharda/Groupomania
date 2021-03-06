class AllPostsView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
    }

    async render() {

        this.cleanContainer();

        this.cleanDivAccount();

        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        this.newDivAccount(user);

        const allPosts = this.getVariable("allPosts");

        let content = `<h1>Liste des publications</h1>`;
        
        content += this.addNewPostForm(user);

        
        
        for (let i = 0; i < allPosts.length; i++) {
            content += this.renderOnePost(allPosts[i], user);
        };
        
        this.display(content);

        this.addImagePreloadEvent();
        
        this.addPostEvents(user);

        this.addCommentEvents(user);

        this.formSubmit(user); 

    } 

    addNewPostForm(user) {
        let content = 
        `<div id="newPost"> ${user.firstname} ${user.lastname}
            <form id="newPostForm" enctype="multipart/form-data" method="post" aria-label="Formulaire d'ajout de publication">
                <div class='formGroup'>
                    <input type="text" id="content" name="content" maxlength="254" placeholder="Exprimez-vous !" autofocus >
                </div>
                <div class="formGroup">
                    <input type="file" id="image" name="image" aria-label="Ajouter une image de publication">
                    <div id="preview">
                     </div> 
                </div>
                <button type="submit" id="btnNewPost" form='newPostForm' aria-label="Valider">
                    Valider
                </button>           
            </form>
        </div>
        <div id="messageModif">
            Modifiez directement vos publications en changeant le texte et/ou en chargeant une nouvelle image.
            Puis cliquer 1 fois sur le bouton Modifier pour la prise en compte.
        </div>`
        ;
        return content;
    }

    addImagePreloadEvent() {
        let imgInput = document.querySelector(`input[id="image"]`);
        imgInput.addEventListener('change', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var reader = new FileReader();
            reader.onload = function(e) {
                let preview = document.getElementById('preview');
                let img = document.createElement('img');
                img.setAttribute('id', 'imgPreview');
                img.setAttribute('object-fit', 'cover');
                img.src=e.target.result;
                preview.appendChild(img);
            };           
            reader.readAsDataURL(this.files[0]);
        });
    }

    /*newDivAccount(user) {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        divAccount.setAttribute('class', 'divAccount');

        const navAccount = document.createElement('nav');

        const divMonCompte = document.createElement('div');
        divMonCompte.textContent = 'MON COMPTE';
        navAccount.setAttribute('class', 'navAccount');
        navAccount.appendChild(divMonCompte);
        divAccount.appendChild(navAccount);

        const ulMenuAccount = document.createElement('ul');
        divMonCompte.appendChild(ulMenuAccount);
        const liLogout = document.createElement('li');
        ulMenuAccount.appendChild(liLogout);
        const logout = document.createElement('a');
        logout.setAttribute('href','#');
        logout.textContent = 'Se déconnecter';
        liLogout.appendChild(logout);
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem('user');
            router.execute('showLogin');
        });

        
        const liDelete = document.createElement('li');
        ulMenuAccount.appendChild(liDelete);
        const deleteAccount = document.createElement('a');
        deleteAccount.setAttribute('href','#');
        deleteAccount.textContent = 'Supprimer';
        liDelete.appendChild(deleteAccount);
        deleteAccount.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeleteUser', user);
        })

        if (user.role === 'admin') {

            const divAdmin = document.createElement('div');
            divAdmin.textContent = 'ADMIN';
            navAccount.appendChild(divAdmin);
            const ulAdmin = document.createElement('ul');
            const liAdmin = document.createElement('li');
            ulAdmin.appendChild(liAdmin);
            divAdmin.appendChild(ulAdmin);
            const users = document.createElement('a');
            users.setAttribute('href', '#');
            users.textContent = "Utilisateurs";
            liAdmin.appendChild(users);
            users.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                //console.log(user.token);
                router.execute('showUsers', user.token);
            })
        }
    }*/

    newDivAccount(user) {
        const divMenu = document.getElementById(DIV_ACCOUNT_ID);
        divMenu.setAttribute('class', 'divMenu');
        divMenu.innerHTML = `<i class="fas fa-bars"></i>`;

        const navMenu = document.createElement('nav');
        navMenu.setAttribute('class', 'navMenu');
        divMenu.appendChild(navMenu);
        
        const divMonCompte = document.createElement('div');
        divMonCompte.setAttribute('class', 'divMonCompte');

        navMenu.setAttribute('class', 'navMenu');
        navMenu.appendChild(divMonCompte);
        divMenu.appendChild(navMenu);

        const ulMenuAccount = document.createElement('ul'); //1er niveau
        ulMenuAccount.setAttribute('class', 'ulMenuAccount');
        divMonCompte.appendChild(ulMenuAccount);
        const liAccount = document.createElement('li');
        liAccount.setAttribute("id", "liAccount");
        liAccount.setAttribute("class", "liAccount");
        liAccount.innerHTML= '<u>Mon compte</u> <i class="fas fa-user-circle"></i>';
        const ulAccount= document.createElement('ul');
        ulAccount.setAttribute('class', 'ulSubMenu');
        liAccount.appendChild(ulAccount);
        ulMenuAccount.appendChild(liAccount);

        const liDelete = document.createElement('li');
        ulAccount.appendChild(liDelete);

        const deleteAccount = document.createElement('a');
        deleteAccount.setAttribute('href','#');
        deleteAccount.textContent = 'Supprimer';
        liDelete.appendChild(deleteAccount);
        deleteAccount.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeleteUser', user);
        });
        liDelete.innerHTML += ' <i class="fas fa-trash-alt"></i>';

        if (user.role === 'admin') {

            const divAdmin = document.createElement('div');
            //divAdmin.textContent = 'ADMIN';
            navMenu.appendChild(divAdmin);
            const ulAdmin = document.createElement('ul');
            ulAdmin.setAttribute('class', 'ulMenuAccount');
            const liAdmin = document.createElement('li');
            liAdmin.innerHTML = `<u> Administration </u><i class="fas fa-user-cog"></i>`;
            ulAdmin.appendChild(liAdmin);
            divAdmin.appendChild(ulAdmin);
            const ulUsers = document.createElement('ul');
            liAdmin.appendChild(ulUsers);
            const liUsers = document.createElement('li');
            ulUsers.setAttribute('class', 'ulSubMenu');
            ulUsers.appendChild(liUsers);
            const users = document.createElement('a');
            users.setAttribute('href', '#');
            users.innerHTML = "Utilisateurs <i class='fas fa-users'></i>";
            liUsers.appendChild(users);
            users.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                //console.log(user.token);
                router.execute('showUsers', user.token);
            })
        }

        const divLogout = document.createElement('div');
        const liLogout = document.createElement('li');
        divLogout.appendChild(liLogout);
        navMenu.appendChild(divLogout);
        const logout = document.createElement('a');
        logout.setAttribute('href','#');
        logout.setAttribute('id', 'logout');
        logout.innerHTML = `Se déconnecter <i class="fas fa-sign-out-alt"></i>`;
        liLogout.appendChild(logout);
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem('user');
            router.execute('showLogin');
        });


    }

    renderOnePost(currentPost, user) {
        let postId = currentPost.id;
        let userId = currentPost.user_id;

        let content = `
            <div id="card${currentPost.id}" class="postCard">
                <span>${currentPost.firstname} ${currentPost.lastname}</span>`;

        // si c'est un admin qui s'est loggé, il peut tout faire ("modérer" par suppr ou modif)
        if (user.role == 'admin') {
  
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin='true' aria-label="Formulaire de modification de la publication">
                <div class='formGroup'>
                <input type="text" name="content" maxlength="254" value="${currentPost.content}" aria-label="contenu de la publication"`;
                if (currentPost.content == '') {
                    content +=` placeholder="Exprimez-vous !">`
                } else {content+=`>`}
                content+=`</div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" alt="image de la publication">
                </div>
                Retirer l'image? <input type="checkbox" name="img_remove">`;
            }
            content += `
                <div class="formGroup">
                    <input type="file" name="image" aria-label="choisir une nouvelle image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}' aria-label="Modifier">
                modifier</button>
                <a href='#' id='${currentPost.id}' admin='true'>
                supprimer</a>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="true" aria-label="commentaires de publication">commentaires</a>
                </div>
            </form>`;
            this.postEventsTab.push({"postId":postId , "userId":userId});
            this.commentEventsTab.push({"postId":postId , "userId":userId,
             "postUserFirstname":currentPost.firstname, "postUserLastname":currentPost.lastname}); 

        } else if (currentPost.user_id === user.userId) {

            // c'est un user qui s'est loggé, il peut modifier ses propres posts
            
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin='false' aria-label="Formulaire de modification de la publication">
                <div class='formGroup'>
                <input type="text" name="content" maxlength="254" value="${currentPost.content}" `;
                if (currentPost.content == '') {
                    content +=` placeholder="Exprimez-vous !">`
                } else {content+=`>`}
                content+=`</div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" aria-label="image de la publication">
                    Retirer l'image? <input type="checkbox" name="img_remove">
                </div>`;
            }
            content += `
                <div class="formGroup">
                    <input type="file" name="image" aria-label="choisir une nouvelle image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}' aria-label="Modifier">
                modifier</button>
                <a href='#' id='${currentPost.id}' admin='false'>
                supprimer</a>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="false" aria-label="Commentaires de publication">commentaires</a>
                </div>
            </form>`;
            this.postEventsTab.push({"postId":postId , "userId":userId});
            this.commentEventsTab.push({"postId":postId , "userId":userId,
             "postUserFirstname":currentPost.firstname, "postUserLastname":currentPost.lastname}); 

        } else {

            //le user ne peut modifier les posts des autres

            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin='false' aria-label="Publication non éditable">
                <div class="formGroup">
                <input class="darken" readonly name="content" maxlength="254" value="${currentPost.content}" `;
                if (currentPost.content == '') {
                    content +=` type="hidden">`
                } else {content+=` type="text">`}
                content+=`</div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" alt="image de la publication">
                </div>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="false" aria-label="Commentaires de publication">commentaires</a>
                </div>
            </form>`;
            }
            this.commentEventsTab.push({"postId":postId , "userId":userId,
             "postUserFirstname":currentPost.firstname, "postUserLastname":currentPost.lastname});  
        }
        content += `</div>`;
        return content;
    }

    display(content) {
        this.container.innerHTML += content;
    }

    addPostEvents (user) {
        for (let i = 0; i < this.postEventsTab.length; i++) {
            this.addPostDeleteEvent(this.postEventsTab[i].postId, this.postEventsTab[i].userId);
            this.addPostModifyEvent(this.postEventsTab[i].postId, this.postEventsTab[i].userId, user);
        }
    }
    
    addCommentEvents (user) {
        for (let i = 0; i < this.commentEventsTab.length; i++) {
            this.addCommentHandleEvent(
                this.commentEventsTab[i].postId,
                this.commentEventsTab[i].userId,
                this.commentEventsTab[i].postUserFirstname,
                this.commentEventsTab[i].postUserLastname);
        }
    } 

    addPostModifyEvent(postId, userId, user) {
        const frmUpdate = document.getElementById('post'+postId);
        let isAdmin = frmUpdate.getAttribute('admin');
        if (isAdmin == "false") {
            frmUpdate.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const formData = new FormData(frmUpdate);
                router.execute('showModifyPost', user, formData, postId);
            })
        } else {
            frmUpdate.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const formData = new FormData(frmUpdate);
                router.execute('showModifyPostByAdmin',  user, formData, postId);
            })
        }

    }

    addCommentHandleEvent(postId, userId, postUserFirstname, postUserLastname) {
        //récupérer les infos du post
        const postContent = document.querySelector(`#post${postId} input[name="content"]`).value;
        const postImage = document.querySelector(`#post${postId} img`) == null?'':document.querySelector(`#post${postId} img`).getAttribute('src');
        const isAdmin = document.getElementById(`post${postId}`).getAttribute('admin');
        const postRef = {
            'content': postContent,
            'image_url': postImage,
            'postId': postId,
            'userId': userId,
            'isAdmin': isAdmin,
            'firstname': postUserFirstname,
            'lastname': postUserLastname
        }
        
        const commentLink = document.querySelector(`#post${postId} a[id="comment${postId}"]`);
        console.log(commentLink);
        commentLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showComment', postRef);
        })
    }

    addPostDeleteEvent(postId, userId) {
        const link = document.getElementById(postId);
        console.log(link);
        let isAdmin = link.getAttribute('admin');
        console.log('link admin :'+ isAdmin);
        if (isAdmin == "false") {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                router.execute('showDeletePost', postId, userId);
            })
        } else {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                router.execute('showDeletePostByAdmin', postId, userId);
            })
        }
    }

    formSubmit(user) {
        const form = document.getElementById('newPostForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(form);
            router.execute('showNewPost', user, formData);
        })
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }
}