import React from 'react';
const access_token = sessionStorage.getItem('bearer');
console.log(access_token);

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }; 
    }

    componentDidMount() {
        // Simple GET request using fetch
        const access_token = sessionStorage.getItem('bearer');
        console.log(access_token);
        fetch('http://localhost:3000/api/auth/getAllUsers', {
            headers :{
                Authorization: "Bearer " + access_token
            }
        })
        .then(response => response.json())        
        .then(data => this.setState({users: data.users}));
        
        /*fetch('http://localhost:3000/api/auth/getAllUsers')
            .then(response => response.json())        
            .then(data => this.setState({users: data.users}));*/
    }


    render() {
        const usersList = this.state.users;
        //console.log(this.state.access_token);
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