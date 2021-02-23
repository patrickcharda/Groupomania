/**
 * Le but de cette classe est d'encapsuler les méthodes pour pouvoir faire
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
                // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
                // on a réellement besoin. 
                if (httpBodyResponse.ok) {
                    // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                    // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                    // exception qui sera attrapée dans le routeur. 
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

    static login(url, mail, pwd) {
        let data = {
            email: mail,
            password: pwd
        }
        return fetch(url,
        { 
            method: 'POST',
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)     
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static newUser(url, mail, pwd, firstName, lastName) {
        console.log(url);
        console.log(mail);
        console.log(pwd);
        console.log(firstName);
        console.log(lastName);
        let data = {
            email: mail,
            password: pwd,
            firstname: firstName,
            lastname: lastName
        }
        return fetch(url,
        { 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'POST',
            body: JSON.stringify(data) 
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static getPosts(url, user) {
        return fetch(url,
            { 
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ user.token
                }    
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }

    static getComments(url, token) {
        return fetch(url,
            { 
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }    
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }

    static updateComment(url, newcontent, token) {
        console.log(newcontent);
        let data = {
            content: newcontent
        }
        return fetch(url,
        { 
            method: 'PUT',
            headers: { 
                "Authorization": "Bearer "+ token,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)    
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static updateCommentByAdmin(url, newcontent, token) {
        console.log(newcontent);
        let data = {
            content: newcontent
        }
        return fetch(url,
        { 
            method: 'PUT',
            headers: { 
                "Authorization": "Bearer "+ token,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)    
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static getAllUsers(url, token) {
        return fetch(url,
            { 
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }    
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }

    static deletePost(url, user) {
        return fetch(url,
            { 
                method: 'DELETE',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ user.token
                }    
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }

    static deleteUser(url, user) {
        console.log(url);
        console.log(user.token);
        return fetch (url,
            { 
            method: 'DELETE',
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer "+ user.token
            }    
        })
        .then(function(httpBodyResponse) {
            if (httpBodyResponse.ok) {
                return httpBodyResponse.json();
            } else {
                throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
            }
        })
        .catch((error) => {
            throw new Error(`Fetch catch : ${error}`);
        });

    }

    static newPost(url, token, formData) {
        console.log(url);
        console.log(token);
        return fetch(url,
        { 
            method: 'POST',
            headers: { 
                "Authorization": "Bearer "+ token
            },
            body: formData     
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static newComment(url, token, newcontent, postId) {
        console.log(url);
        console.log(token);
        let data = {
            content: newcontent,
            post_id: postId
        }
        return fetch(url,
        { 
            method: 'POST',
            headers: { 
                "Authorization": "Bearer "+ token,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)   
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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

    static deleteComment(url, token) {
        console.log(url);
        console.log(token);
        return fetch (url,
            { 
            method: 'DELETE',
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer "+ token
            }    
        })
        .then(function(httpBodyResponse) {
            if (httpBodyResponse.ok) {
                return httpBodyResponse.json();
            } else {
                throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
            }
        })
        .catch((error) => {
            throw new Error(`Fetch catch : ${error}`);
        });

    }

    static updatePost(url, token, formData) {
        console.log(url);
        console.log(token);
        return fetch(url,
        { 
            method: 'PUT',
            headers: { 
                "Authorization": "Bearer "+ token
            },
            body: formData     
        })
        .then(function(httpBodyResponse) {
            // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
            // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
            // on a réellement besoin. 
            if (httpBodyResponse.ok) {
                // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                // exception qui sera attrapée dans le routeur. 
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