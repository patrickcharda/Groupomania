/** 
 *  Point d'entrée, lance le premier script. 
 */

// Déclaration du routeur. 
const router = new Router();

// Lancement de la premiere page. 

let isLogged = JSON.parse(localStorage.getItem('user'));
//console.log('isLogged :'+isLogged);
//console.log('email :'+isLogged.email+' password: '+isLogged.password);
if (isLogged == null) {
    router.execute("showLogin");
} else {
    console.log('email :'+isLogged.email+' token: '+isLogged.token
                +' id:'+isLogged.userId+' role :'+isLogged.role);
    router.execute("showPosts");
}


// Astuce : pour afficher un console.log en couleur. 
// console.log("%c test", "background:green; color:white");
