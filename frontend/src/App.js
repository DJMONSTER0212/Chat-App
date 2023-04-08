import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ChatPage from './components/ChatPage';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home} />      
      <Route exact path='/chats' component={ChatPage}/>      
    </div>
  );
}

export default App;
