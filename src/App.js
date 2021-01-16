import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TeacherRegister from './components/TeacherRegister/TeacherRegister'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import './App.css';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/profesor/registro" exact component={TeacherRegister}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/" exact component={Home}/>
    </Switch>
  </Router>
  );
}

export default App;
