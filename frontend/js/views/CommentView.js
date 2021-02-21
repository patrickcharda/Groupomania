class CommentView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        var postRef = this.getVariable('postRef');
        //var userId = postRef.userId;
        //console.log(userId);
        let allComments = this.getVariable('allComments');

        console.log(postRef);
        console.log(allComments);
        
        let content = `
            <div>
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

            for (let i = 0; i < allComments.length; i++) {
                content += this.renderOneComment(allComments[i], postRef); 
            }
        
        this.display(content);

        this.addCommentsEvents();
    }

    renderOneComment(currentComment, postref) {
        console.log("current comment user_id:"+currentComment.user_id);
        console.log("post user id :"+postref.userId);
        console.log('admin? :'+postref.isAdmin);
        let content =
            `<div class="comment" id="div${currentComment.id}">${currentComment.firstname} &nbsp ${currentComment.lastname}
                <form id="comment${currentComment.id}">`;
                    if (postref.isAdmin == 'true') {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="true">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}'>
                            modifier
                        </button>`;
                        this.commentEventsTab.push(currentComment.id);
                    } else if (postref.userId == currentComment.user_id) {
                        content += `
                        <input type="text" name="content" value="${currentComment.content}" admin="false">
                        <button type="submit" name='button${currentComment.id}' form='comment${currentComment.id}'>
                            modifier
                        </button>`;
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
            console.log(this.commentEventsTab[i]);
            //this.addCommentDeleteEvent(this.commentEventsTab[i].id);
            this.addCommentModifyEvent(this.commentEventsTab[i]);
        }
    }

    addCommentModifyEvent(commentId) {
        console.log('event for comment :'+commentId);
        const frmComment = document.getElementById('comment'+commentId);
        const isAdmin = frmComment.querySelector('input[name="content"]').getAttribute('admin');
        //console.log(isAdmin.getAttribute('admin'));
        console.log('TEST IS ADMIN :'+isAdmin);
        frmComment.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const content = frmComment.querySelector('input[name="content"').value;
            console.log(content);
            router.execute('showCommentUpdate', commentId, content, isAdmin);
        })
    }


    
    /*formSubmit() {
        const form = document.getElementById('loginForm');
        console.log(form.id);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = document.getElementById('userEmail');
            console.log(email.value)
            const password = document.getElementById('userPassword');
            console.log(password.value);
            router.execute('showLogged', email.value, password.value);
        })
    }*/
   
}