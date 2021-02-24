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

        let content = this.addNewPostForm(user);

        
        
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
            <form id="newPostForm" enctype="multipart/form-data" method="post">
                <div class='formGroup'>
                    <input type="text" id="content" name="content" maxlength="254" placeholder="Exprimez-vous !" autofocus >
                </div>
                <div class="formGroup">
                    <input type="file" id="image" name="image" >
                    <div id="preview">
                     </div> 
                </div>
                <button type="submit" id="btnNewPost" form='newPostForm'>
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

    newDivAccount(user) {
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
    }

    renderOnePost(currentPost, user) {
        let postId = currentPost.id;
        let userId = currentPost.user_id;

        let content = `
            <div id="card${currentPost.id}" class="postCard">
                <span>${currentPost.firstname} ${currentPost.lastname}</span>`;

        // si c'est un admin qui s'est loggé, il peut tout faire ("modérer" par suppr ou modif)
        if (user.role == 'admin') {

            //content+= `<a href='#' id='${currentPost.id}' admin='true'>
            //supprimer</a>`;
            
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin='true'>
                <div class='formGroup'>
                <input type="text" name="content" maxlength="254" value="${currentPost.content}" `;
                if (currentPost.content == '') {
                    content +=` placeholder="Exprimez-vous !">`
                } else {content+=`>`}
                content+=`</div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" width="50" heigth="50">
                </div>
                Retirer l'image? <input type="checkbox" name="img_remove">`;
            }
            content += `
                <div class="formGroup">
                    <input type="file" name="image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}'>
                modifier</button>
                <a href='#' id='${currentPost.id}' admin='true'>
                supprimer</a>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="true">commentaires</a>
                </div>
            </form>`;
            this.postEventsTab.push({"postId":postId , "userId":userId});
            this.commentEventsTab.push({"postId":postId , "userId":userId,
             "postUserFirstname":currentPost.firstname, "postUserLastname":currentPost.lastname}); 

        } else if (currentPost.user_id === user.userId) {

            // c'est un user qui s'est loggé, il peut modifier ses propres posts

            content+= `<a href='#' id='${currentPost.id}' admin='false' >
            supprimer</a>`
            
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin="false">
                <div class='formGroup'>
                    <input type="text" name="content" maxlength="254" value="${currentPost.content}">
                </div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" width="50" heigth="50">
                    Retirer l'image? <input type="checkbox" name="img_remove">
                </div>`;
            }
            content += `
                <div class="formGroup">
                    <input type="file" name="image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}'>
                modifier</button>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="false">commentaires</a>
                </div>
            </form>`;
            this.postEventsTab.push({"postId":postId , "userId":userId});
            this.commentEventsTab.push({"postId":postId , "userId":userId,
             "postUserFirstname":currentPost.firstname, "postUserLastname":currentPost.lastname}); 

        } else {

            //le user ne peut modifier les posts des autres

            content += `
            <div id="post${currentPost.id}" admin="false">
                <div>
                    <input type="texte" value="${currentPost.content}" name="content" readonly>
                </div>`;
            if (currentPost.image_url != '') {
            content +=`
                <div class="imgPost">
                    <img src="${BASE_STATIC}/${currentPost.image_url}" width="50" heigth="50">
                </div>
                <div>
                    <a href="#" id="comment${currentPost.id}" admin="false">commentaires</a>
                </div>
            </div>`;
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
        /*commentLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showComment', postRef);
        })*/
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