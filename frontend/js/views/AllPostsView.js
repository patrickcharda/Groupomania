class AllPostsView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
        this.eventsTab = []; 
    }

    async render() {

        this.cleanContainer();

        //const token = this.getVariable("token");
        //const role = this.getVariable("role");
        //const userId = this.getVariable("userId");
        const allPosts = this.getVariable("allPosts");
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        //let content = `test ${token} ${role} ${userId} ${allPosts.length} ${user.role}`;
        let content =
        `<div id="newPost"> ${user.firstname} ${user.lastname}
            <form id="newPostForm" enctype="multipart/form-data" method="post">
                <div class='formGroup'>
                    <label for="content">
                    </label>
                    <input type="text" id="content" name="content" maxlength="254" placeholder="Exprimez-vous !">
                </div>
                <div class="formGroup">
                    <input type="file" id="image" name="image">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewPost" form='newPostForm';>
                        ok
                    </button>
                </div>
            </form>
        </div>`
        ;
     

        for (let i = 0; i < allPosts.length; i++) {
            content += this.renderOnePost(allPosts[i], user);
        }

        
        await this.display(content);
        
        this.addPostDeleteEvents();
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
            this.eventsTab.push({"postId":postId , "userId":userId}) ;
        } else if (currentPost.user_id === user.userId) {
            content+= `<a href='#' id='${currentPost.id}' admin='false' >
            supprimer</a>`;
            this.eventsTab.push({"postId":postId , "userId":userId}) ; 
        }
        content += `<p>${currentPost.content}</p>
        <div class="imgPost">
            <img src="${BASE_STATIC}/${currentPost.image_url}" width="50" heigth="50">
        </div>
        </div>`;
        return content;
    }

    display(content) {
        this.container.innerHTML += content;
    }

    addPostDeleteEvents () {

        for (let i = 0; i < this.eventsTab.length; i++) {
            console.log(this.eventsTab[i].postId);
            this.addPostDeleteEvent(this.eventsTab[i].postId, this.eventsTab[i].userId);
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
}