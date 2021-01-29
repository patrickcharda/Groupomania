import React from 'react';

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sauce: null
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://localhost:3000/api/sauces/600aa49bd6d72005dc1caf1b')
            .then(response => response.json())
            .then(data => this.setState({ sauce: data.name }));
    }

    render() {
        const { sauce } = this.state;
        return (
            <div>
                <h5>{sauce}</h5>
                <div>
                </div>
            </div>
        );
    }
}

export { GetRequest }; 