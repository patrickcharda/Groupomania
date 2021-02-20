class AllPostsView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
        this.eventsTab = []; 
    }

    async render() {

        this.cleanContainer();
        //const token = this.getVariable("token");

        this.cleanDivAccount();

        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

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




        if (user.role === 'admin') {
            const users = document.createElement('a');
            users.setAttribute('href', '#');
            users.textContent = "Utilisateurs";
            divAccount.appendChild(users);
            users.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                //console.log(user.token);
                router.execute('showUsers', user.token);
            })
        }
        

        const allPosts = this.getVariable("allPosts");

        //let content = `test ${token} ${role} ${userId} ${allPosts.length} ${user.role}`;
        let content =
        `<div id="newPost"> ${user.firstname} ${user.lastname}
            <form id="newPostForm" enctype="multipart/form-data" method="post">
                <div class='formGroup'>
                    <input type="text" id="content" name="content" maxlength="254" placeholder="Exprimez-vous !">
                </div>
                <div class="formGroup">
                    <input type="file" id="image" name="image">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewPost" form='newPostForm'>
                        ok
                    </button>
                </div>
            </form>
        </div>`
        ;
     

        for (let i = 0; i < allPosts.length; i++) {
            content += this.renderOnePost(allPosts[i], user);
        }

        
        this.display(content);
        
        this.addPostEvents(user);
        /*for (let i = 0; i < this.eventsTab.length; i++) {
            console.log(this.eventsTab[i].postId);
            this.addPostDeleteEvent(this.eventsTab[i].postId, this.eventsTab[i].userId);
        }*/

        this.formSubmit(user); 

    } 

    renderOnePost(currentPost, user) {
        let postId = currentPost.id;
        let userId = currentPost.user_id;

        let content = `
            <div id="card${currentPost.id}" class="postCard">
                <span>${currentPost.firstname} ${currentPost.lastname}</span>`;

        if (user.role == 'admin') {

            content+= `<a href='#' id='${currentPost.id}' admin='true'>
            supprimer</a>`;
            
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin='true'>
                <div class='formGroup'>
                <input type="text" id="content" name="content" maxlength="254" value="${currentPost.content}">
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
                    <input type="file" id="image" name="image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}'>
                modifier</button>
            </form>`;
            this.eventsTab.push({"postId":postId , "userId":userId}) ;

        } else if (currentPost.user_id === user.userId) {

            content+= `<a href='#' id='${currentPost.id}' admin='false' >
            supprimer</a>`
            
            content += `
            <form id="post${currentPost.id}" enctype="multipart/form-data" method="post" admin="false">
                <div class='formGroup'>
                    <input type="text" id="content" name="content" maxlength="254" value="${currentPost.content}">
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
                    <input type="file" id="image" name="image">
                </div>`;
            content += `
                <button type="submit" name='${currentPost.id}' form='post${currentPost.id}'>
                modifier</button>
            </form>`;
            this.eventsTab.push({"postId":postId , "userId":userId}) ; 
        } else {

            content += `<p>${currentPost.content}</p>`;
            if (currentPost.image_url != '') {
            content +=`
            <div class="imgPost">
                <img src="${BASE_STATIC}/${currentPost.image_url}" width="50" heigth="50">
            </div>`;
            }

        }
        content += `</div>`;
        return content;
    }

    display(content) {
        this.container.innerHTML += content;
    }

    addPostEvents (user) {

        for (let i = 0; i < this.eventsTab.length; i++) {
            console.log(this.eventsTab[i].postId);
            this.addPostDeleteEvent(this.eventsTab[i].postId, this.eventsTab[i].userId);
            this.addPostModifyEvent(this.eventsTab[i].postId, this.eventsTab[i].userId, user);
        }
    

    } 

    addPostModifyEvent(postId, userId, user) {
        const frmUpdate = document.getElementById('post'+postId);
        console.log(frmUpdate);
        let isAdmin = frmUpdate.getAttribute('admin');
        console.log('frmUpdate admin :'+ isAdmin);
        if (isAdmin == "false") {
            frmUpdate.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const formData = new FormData(frmUpdate);
                //console.log(formData.get('img_remove'));
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
        console.log(form.getAttribute('id'));
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