
const router = new Router();

// Lancement de la premiere page. 

let isLogged = JSON.parse(localStorage.getItem('user'));

if (isLogged == null) {
    router.execute("showLogin");
} else {
    console.log('email :'+isLogged.email+' token: '+isLogged.token
                +' id:'+isLogged.userId+' role :'+isLogged.role);

    loggedFrom = isLogged.loggedFrom;
    console.log(loggedFrom);
    now = new Date().getTime();
    console.log(now);
    oneDayInMilliseconds = 1000*60*60*24;
    //expiration du localStorage au bout de 24h (idem token)
    if ( (now - loggedFrom) >= oneDayInMilliseconds ) {
        localStorage.removeItem('user');
        router.execute("showLogin");
    } else {router.execute("showPosts");}
    
}

