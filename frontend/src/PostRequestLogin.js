import React from 'react';

class PostRequestLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
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
            .then(data => this.setState({ user: data.user }));
    }

    render() {
        const userLogged = this.state.user;
        console.log(userLogged);
        
        return (
            <div>
                <h5>User logged</h5>
                <p>
                <ul>
                        {userLogged.map(user => (
                            <li>
                                 {user.email}
                            </li>
                        ))}
                    </ul>
                </p>
            </div>
        );
    }

}

export { PostRequestLogin }; 
