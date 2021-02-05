import React from 'react';

class PostRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: []
        };
    }

    componentDidMount() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'pierre@free.fr', password: 'Pierre777' })
        };
        fetch('http://localhost:3000/api/auth/signup', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ userId: data.signup }));
    }

    render() {
        const newUser = this.state.userId;
        //console.log(users.email);
        
        return (
            <div>
                <h5>Simple POST Request</h5>
                <p>
                    {newUser}
                </p>
            </div>
        );
    }

}

export { PostRequest }; 
