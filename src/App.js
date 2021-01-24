import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TeacherRegister from './components/TeacherRegister/TeacherRegister'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import CreateSheet from './components/CreateSheet/CreateSheet'
import './App.css';
import ShowSheets from './components/ShowSheets/ShowSheets'
import LayoutTeacher from './components/LayoutTeacher/LayoutTeacher'

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/profesor/registro" exact component={TeacherRegister}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/" exact component={Home}/>
      <Route path="/profesor/fichas" exact component={CreateSheet}/>
      <Route path="/fichas" exact component={ShowSheets}/>
      <Route path="/profesor" exact component={LayoutTeacher}/>
    </Switch>
  </Router>
  );
}

export default App;
