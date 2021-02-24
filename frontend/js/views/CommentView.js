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

        let content = this.addPostRef(postRef);

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
            <form id="newCommentForm" method="post">
                <div class='formGroup'>
                    <input type="text" id="newcomment" name="${postId}" maxlength="254" placeholder="Exprimez-vous !">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewComment" form='newCommentForm'>
                        Valider
                    </button>
                </div>
            </form>
        </div>`
        ;
        return content;
    }

    newDivAccount() {

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
    }

    addPostRef(postRef) {
        let content = `
        <div id="postRef">
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
                    <img src="${postRef.image_url}" width="75" height="130">
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
                <form id="comment${currentComment.id}" class="commentFrm">`;
                    // l'admin peut modifier tous les commentaires
                    if (postref.isAdmin == 'true') {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="true">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}'>
                            modifier
                        </button>
                        <a href="#" id="delLink${currentComment.id}" admin="true">supprimer</a>`;
                        this.commentEventsTab.push(currentComment.id);
                    // le rédacteur d'un commentaire peut le modifier
                    } else if (userId == currentComment.user_id) {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="false">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}'>
                            modifier
                        </button>
                        <a href="#" id="delLink${currentComment.id}" admin="false">supprimer</a>`;
                        this.commentEventsTab.push(currentComment.id);
                    } else {
                        content += `
                        <input type="text" class="darken" name="content" value="${currentComment.content}" readonly>`;
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