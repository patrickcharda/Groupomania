class Ajax {


    static getAllPosts(url, token) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    //console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            request.open("GET", url);
            request.setRequestHeader(
                "Authorization", "Bearer " + token
            );
            request.setRequestHeader("Content-Type", "application/json");
            request.send();
        });
    }
    
    static get(url, token) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    //console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            request.open("GET", url);
            request.setRequestHeader(
                "Authorization", "Bearer " + token
            );
            request.setRequestHeader("Content-Type", "application/json");
            request.send();
        });
    }

    static post(url, order) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            //console.log(order);
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && (this.status == 200 || this.status == 201)) {
                    var response = JSON.parse(this.responseText);
                    //alert('echo');
                    //console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && (this.status != 200 || this.status != 201)) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(order));
        });
    }

    static post(url, login, pwd) {
        return new Promise(function(resolve, reject) {
            console.log(url);
            console.log(login);
            console.log(pwd);
            var request = new XMLHttpRequest();
            //console.log(order);
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && (this.status == 200 || this.status == 201)) {
                    var response = JSON.parse(this.responseText);
                    //alert('echo');
                    //console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && (this.status != 200 || this.status != 201)) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({ email: login, password: pwd }));
        });
    }
}
