/**
 * Le but de cette classe est d'encapsuler les méhtodes pour pouvoir faire
 * les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url qui retourne du JSON et retourne son contenu.
     * Pour s'en servir : let content = await Model.get("url");
     * @param {string} url 
     * @return {Promise}
     */
    static get(url) {
        return fetch(url)
            .then(function(httpBodyResponse) {
                // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
                // Du coup, avec .json, on réccupère la partie "json" de la réponse, qui est ce dont
                // on a réellement besoin. 
                if (httpBodyResponse.ok) {
                    // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                    // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                    // execption qui sera attrapée dans le routeur. 
                    return httpBodyResponse.json();
                } else {
                    // Sinon, envoie une erreur (qui sera attrapée dans le routeur)
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }


}