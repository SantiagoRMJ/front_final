import React, { Component } from 'react';
import {Link} from 'react-router-dom';





export default class LayoutTeacher extends Component {
    render() {
        const token = JSON.parse(localStorage.getItem('token'))

        const logOut = () =>{
            localStorage.removeItem('token')
        }
        
        console.log(token.name)
        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/profesor/fichas">Crear ficha</Link>
                 <Link className="link" to="/fichas">Fichas</Link>
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
            </div>
            <div className="home-body">
                <h1> Bienvenid@ {token.name}</h1>
                <h2>Comienza a crear fichas para tus alumnos simplemente haciendo click en "CREAR FICHA"</h2>
                <h3>Cuando crees la ficha, al darle a enviar, se enviará una copia a cada alumno que tengas asignado.</h3>
            </div>
            <body>
                
            </body>
            </>

        )
    }
}
