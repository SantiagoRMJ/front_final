import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import axios from 'axios';



export default class Home extends Component {
    render() {
        return (
            <>
            <div className="nav-container">
                <Link className="link" to="/profesor/registro">Registro de profesores</Link>
                 <Link className="link" to="/alumno/registro">Registro de alumnos</Link>
                 <Link className="link" to="/login">Login</Link>
            </div>
            <div className="home-body">
                <h1>Bienvenid@ a Virtual HomeWork</h1>
                <h2>Regístrate como profesor y comienza a a gestionar las tareas de tus alumnos de forma sencilla e intuitiva </h2>
                <h2>O regístrate como alumno para estar al día con las tareas de clase.</h2>
            </div>
            <body>
                
            </body>
            </>

        )
    }
}


        
    
