import logo from './logo.svg';
import './App.css';
//import { GetRequest } from './GetRequest';
//import { PostRequest } from './PostRequest';
import { PostRequestLogin } from './PostRequestLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React ...
        </a>
      </header>
      {/*<GetRequest />*/}
      {/*<PostRequest />*/}
      <PostRequestLogin />
    </div>
  );
}

export default App;