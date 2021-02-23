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
                        ok
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
        const logout = document.createElement('a');
        logout.setAttribute('href','#');
        logout.textContent = 'Se déconnecter';
        divAccount.appendChild(logout);
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem('user');
            router.execute('showLogin');
        });

        const deleteAccount = document.createElement('a');
        deleteAccount.setAttribute('href','#');
        deleteAccount.textContent = 'Supprimer';
        divAccount.appendChild(deleteAccount);
        deleteAccount.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeleteUser', user);
        })
    }

    addPostRef(postRef) {
        let content = `
        <div>
            ${postRef.firstname} &nbsp; ${postRef.lastname}
            <div>
                `
                if (postRef.content!='') {
                    content+= postRef.content;
                };
                `
            </div>
            <div>
                `
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
                <form id="comment${currentComment.id}">`;
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
                        <input type="text" name="content" value="${currentComment.content}" readonly>`;
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