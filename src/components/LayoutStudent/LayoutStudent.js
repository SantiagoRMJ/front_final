import React, { Component } from 'react';
import {Link} from 'react-router-dom';





export default class LayoutStudent extends Component {
    render() {
        const token = JSON.parse(localStorage.getItem('token'))

        const logOut = () =>{
            localStorage.removeItem('token')
        }
        
        console.log(token.name)
        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/alumno/fichas">Mis fichas</Link>
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
            </div>
            <div className="home-body">
                <h1> Bienvenid@ {token.name}</h1>
                <h2>Revisa tus fichas</h2>
                <h3>Cuando completes la ficha tu profesor recibirá una notificación</h3>
            </div>
            <body>
                
            </body>
            </>

        )
    }
}
