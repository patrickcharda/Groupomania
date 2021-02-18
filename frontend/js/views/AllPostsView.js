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
        let content = '';

        for (let i = 0; i < allPosts.length; i++) {
            content += this.renderOnePost(allPosts[i], user);
        }

        
        await this.display(content);
        
        for (let i = 0; i < this.eventsTab.length; i++) {
            console.log(this.eventsTab[i].postId);
            this.addPostDeleteEvent(this.eventsTab[i].postId, this.eventsTab[i].userId);
        }
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
            //this.postDeleteEvent(currentPost.id, currentPost.user_id);
        } else if (currentPost.user_id === user.userId) {
            content+= `<a href='#' id='${currentPost.id}' admin='false' >
            supprimer</a>`;
            this.eventsTab.push({"postId":postId , "userId":userId}) ; 
        }
        content += `<p>${currentPost.content}</p></div>`;
        return content;
    }

    display(content) {
        this.container.innerHTML += content;
    }

    addPostDeleteEvent(postId, userId) {
        const link = document.getElementById(postId);
        console.log(link.getAttribute('admin'));
        console.log('link id :'+link.id);
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeletePost', postId, userId);
        });
    }
}