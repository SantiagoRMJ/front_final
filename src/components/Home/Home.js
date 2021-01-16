import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import axios from 'axios';



export default class Home extends Component {
    render() {
        return (
            <div>
                <Link className="link" to="/profesor/registro">Registro de profesores</Link>
                 <Link className="link" to="/alumno/registro">Registro de alumnos</Link>
                 <Link className="link" to="/login">Login</Link>
                 <Link className="link" to="/fichas">Fichas</Link>
            </div>
        )
    }
}
