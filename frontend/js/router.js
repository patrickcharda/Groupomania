class Router {

     /* 
     * @param {string} page : le nom de la page visée. 
     * @param  {...any} args : la liste des arguments que l'on veut passer à cette page. 
     */
    async execute(page, ...args) {
        let controller = new Controller(args);

        try {
            switch (page) {
                case "showLogin":
                    await controller.showLogin();
                    break;

                case "showLogged":
                    await controller.showLogged();
                    break;

                case "showUserRecord":
                    await controller.showUserRecord();
                    break;
                
                case "showPosts":
                    await controller.showPosts();
                    break;
                
                case "showDeletePost":
                    await controller.showDeletePost();
                    break;
                
                case "showNewPost":
                    await controller.showNewPost();
                    break;

                case "showDeletePostByAdmin":
                    await controller.showDeletePostByAdmin();
                    break;

                case "showModifyPost":
                    await controller.showModifyPost();
                    break;

                case "showModifyPostByAdmin":
                    await controller.showModifyPostByAdmin();
                    break;

                case "showComment":
                    await controller.showComment();
                    break;

                case "showNewComment":
                    await controller.showNewComment();
                    break;
                
                case "showCommentUpdate":
                    await controller.showCommentUpdate();
                    break;

                case "showDeleteComment":
                    await controller.showDeleteComment();
                    break;
                
                case "showSignup":
                    await controller.showSignup();
                    break;

                case "showUsers":
                    await controller.showUsers();
                    break;
                
                case "showDeleteUser":
                    await controller.showUserDelete();
                    break;
                
                case "showUserDeleteByAdmin":
                    await controller.showUserDeleteByAdmin();
                    break;

                default:
                    controller.showError("Route inconnue : " + page);
            }
        } catch (error) {
            controller.showError(error);
        }
    }
}