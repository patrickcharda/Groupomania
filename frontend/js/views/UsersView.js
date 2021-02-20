class UsersView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
        this.eventsTab = [];  
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);

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

        const allUsers = this.getVariable("allUsers");
        console.log(allUsers);
        //console.log(allUsers[3].email);

        let content=`<h3>Liste des utilisateurs</h3>`;

        for (let i = 0; i < allUsers.length; i++) {

            content += 
            `<div class="user" id="user${allUsers[i].id}"><div>${allUsers[i].firstname}</div>
                <div>${allUsers[i].lastname}</div>
                <div>${allUsers[i].email}</div>
                <div>
                    <a href="#" id="${allUsers[i].id}">supprimer</a>
                </div>
            </div>`;
            this.eventsTab.push(allUsers[i].id);
        }

        
        this.display(content);

        this.addEvents(user);
        
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

    addEvents(user) {
        for (let i=0; i<this.eventsTab.length; i++) {
            let userIdLink = document.getElementById(this.eventsTab[i]);
            let userId = this.eventsTab[i];
            console.log(userId);
            console.log(userIdLink.id);
            userIdLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                router.execute("showUserDeleteByAdmin", user, userId);
            })
        }
    }

}