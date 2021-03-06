class CommentView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        this.newDivAccount();
 
        var postRef = this.getVariable('postRef');
        let postId = postRef.postId;

        let allComments = this.getVariable('allComments');

        var user = JSON.parse(localStorage.getItem('user'));

        console.log(postRef);

        let content = `<h1>Liste des commentaires</h1>`;
        
        content += this.addPostRef(postRef);

        content += this.addNewCommentForm(user, postId);

        content += `<div id="allComments">`;

        for (let i = 0; i < allComments.length; i++) {
            content += this.renderOneComment(allComments[i], postRef, user.userId); 
        }

        content += `</div>`;
        
        this.display(content);

        this.addCommentsEvents();

        this.formSubmit(user, postRef); 
    }

    addNewCommentForm(user, postId) {
        let content = 
        `<div id="newComment"> ${user.firstname} ${user.lastname}
            <form id="newCommentForm" method="post" aria-label="Formulaire d'ajout de commentaires pour la publication choisie">
                <div class='formGroup'>
                    <input type="text" id="newcomment" name="${postId}" maxlength="254" placeholder="Exprimez-vous !">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewComment" form='newCommentForm' aria-label="Valider">
                        Valider
                    </button>
                </div>
            </form>
        </div>`
        ;
        return content;
    }

    /*newDivAccount() {

        var user = JSON.parse(localStorage.getItem('user'));
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

    newDivAccount() {

        var user = JSON.parse(localStorage.getItem('user'));
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

    addPostRef(postRef) {
        let content = `
        <div id="postRef" aria-label="section relative à la publication de référence">
            ${postRef.firstname} &nbsp; ${postRef.lastname}
            <div id="postRefContent"><input class="darken" readonly value="
                `;
                if (postRef.content!='') {
                    content+= postRef.content;
                
                content+=`" type="text">`;
                } else {
                content+= `" type="hidden">`;
                };
                
            content+=`</div>
            <div id="postRefImg">
                `;
                if (postRef.image_url !='') {
                    content += `
                    <img src="${postRef.image_url}" width="75" height="130" alt="image de la publication de référence">
                    `;
                }
                content +=`
            </div>
        </div>`;
        return content;
    }

    renderOneComment(currentComment, postref, userId) {
        let content =
            `<div class="comment" id="div${currentComment.id}">${currentComment.firstname} &nbsp ${currentComment.lastname}
                <form id="comment${currentComment.id}" class="commentFrm" aria-label="Formulaire de modification de commentaire">`;
                    // l'admin peut modifier tous les commentaires
                    if (postref.isAdmin == 'true') {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="true" aria-label="contenu">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}' aria-label="Modifier">
                            modifier
                        </button>
                        <a href="#" id="delLink${currentComment.id}" admin="true" aria-label="Suppression du commentaire">supprimer</a>`;
                        this.commentEventsTab.push(currentComment.id);
                    // le rédacteur d'un commentaire peut le modifier
                    } else if (userId == currentComment.user_id) {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="false" aria-label="contenu">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}' aria-label="Modifier">
                            modifier
                        </button>
                        <a href="#" id="delLink${currentComment.id}" admin="false" aria-label="suppression du commentaire">supprimer</a>`;
                        this.commentEventsTab.push(currentComment.id);
                    } else {
                        content += `
                        <input type="text" class="darken" name="content" value="${currentComment.content}" aria-label="contenu du commentaire"readonly>`;
                    }
                content +=`
                </form>
            </div>`;
        return content;
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }

    display(content) {
        this.container.innerHTML += content;
    }

    addCommentsEvents() {
        for (let i = 0; i < this.commentEventsTab.length; i++) {
            this.addCommentModifyEvent(this.commentEventsTab[i]);
            this.addCommentDeleteEvent(this.commentEventsTab[i]);
        }
    }

    addCommentModifyEvent(commentId) {
        const frmComment = document.getElementById('comment'+commentId);
        const isAdmin = frmComment.querySelector('input[name="content"]').getAttribute('admin');
        console.log('TEST IS ADMIN :'+isAdmin);
        frmComment.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const content = frmComment.querySelector('input[name="content"').value;
            router.execute('showCommentUpdate', commentId, content, isAdmin);
        })
    }

    formSubmit(user, postRef) {
        const form = document.getElementById('newCommentForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let content = document.getElementById('newcomment');
            const postId = content.getAttribute('name');
            content = content.value;
            if (content !='') {
                router.execute('showNewComment', user, content, postId, postRef);
            }
            
        })
    }

    addCommentDeleteEvent(commentId) {
        const delLink = document.getElementById('delLink'+commentId);
        let isAdmin = delLink.getAttribute('admin');
        delLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeleteComment', commentId, isAdmin);
        })
    }
   
}