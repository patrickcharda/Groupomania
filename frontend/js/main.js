/** 
 *  Point d'entrée, lance le premier script. 
 */

// Déclaration du routeur. 
const router = new Router();

// Lancement de la premiere page. 

let isLogged = localStorage.getItem('token');
if (!isLogged) {
    router.execute("showLogin");
} else {
    router.execute("showRecentPosts")
}


// Astuce : pour afficher un console.log en couleur. 
// console.log("%c test", "background:green; color:white");
