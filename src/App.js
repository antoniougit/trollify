import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    },
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });
    };

    calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return data.outputs[0].data.regions.map((face) => {
            const clarifaiFace = face.region_info.bounding_box;
            return {
                leftCol:
                    clarifaiFace.left_col * width - 20 * clarifaiFace.left_col,
                topRow: clarifaiFace.top_row * height,
                rightCol:
                    width -
                    clarifaiFace.right_col * width -
                    20 * clarifaiFace.right_col,
                bottomRow: height - clarifaiFace.bottom_row * height,
            };
        });
    };

    displayFaceBox = (boxes) => {
        this.setState({ boxes });
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('https://trollify-server.herokuapp.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: this.state.input }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    fetch('https://trollify-server.herokuapp.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: this.state.user.id }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count,
                                })
                            );
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch((err) => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route });
    };

    render() {
        const { isSignedIn, imageUrl, route, boxes } = this.state;
        return (
            <div className="App">
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === 'home' ? (
                    <div>
                        <Logo />
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                    </div>
                ) : (
                    <SignIn
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                )}
            </div>
        );
    }
}

export default App;
