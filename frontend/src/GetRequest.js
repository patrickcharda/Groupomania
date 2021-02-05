import React from 'react';

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://localhost:3000/api/auth/getAllUsers')
            .then(response => response.json())        
            .then(data => this.setState({users: data.users}));
    }


    render() {
        const usersList = this.state.users;
        //console.log(users.email);
        
        return (
            <div>
                <h5>Utilisateurs</h5>
                <div>
                    <ul>
                        {usersList.map(user => (
                            <li>
                                {user.id} <br></br> {user.email}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        );
    }
}

export { GetRequest }; 