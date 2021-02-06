import React from 'react';

class PostRequestLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            token: ''
        };
    }

    componentDidMount() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'fanny@free.fr', password: 'Fanny777' })
        };
        fetch('http://localhost:3000/api/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ user: data.user, token: data.token });
            sessionStorage.setItem('bearer', data.token);
        })
            
    }

    render() {
        const userLogged = this.state.user;
        const token = this.state.token;
        console.log(userLogged);
        console.log(token);
        const bearer = sessionStorage.getItem('bearer');
        console.log(bearer);
        
        return (
            <div>
                <h5>User logged</h5>

                <ul>
                        {userLogged.map(user => (
                            <li>
                                 {user.email}
                            </li>
                        ))}
                    </ul>

            </div>
        );
    }

}

export { PostRequestLogin }; 
