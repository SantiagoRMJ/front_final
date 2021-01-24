import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import ShowSheets from '../ShowSheets/ShowSheets';





export default class LayoutTeacher extends Component {
    constructor(props){
        super(props)

        this.state = {
            students: [],
            class: ""
        }
    }
    componentDidMount = async ()=>{
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            this.setState({class: token.class})
            console.log(this.state.class)
            const myStudents = await axios.get(`http://localhost:3000/student/${token.class}`)
            console.log(myStudents.data.students)
            this.setState({students: myStudents.data.students}) 
        }catch(err){
            console.log(err)
        }
    }   
    myStudents = () => {
     console.log(this.state.students)
        if(this.state.students[0]){
            return(
                this.state.students.map(student => {
                    return(
                        <div className="body" key={student.id}>
                            <h3>{student.name}</h3>
                            
                        </div>
                    
                    )
                }))         
        }else{
            return(<div>CARGANDO LOS DATOS.</div>)
        }   
    }
    
    showSheets(){
        this.render()
        return(
            <div>
            <ShowSheets/>
            </div>
        )
    }

    render() {

        const logOut = () =>{
            localStorage.removeItem('token')
        }
        const token = JSON.parse(localStorage.getItem('token'))
        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/profesor/fichas">Crear ficha</Link>
                 <Link className="link" to="/fichas">Todas las Fichas</Link>
                 <Link className="link" onClick={()=> this.myStudents()}>Mis alumnos</Link>
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
                 <Link className="link" onClick={() =>this.showSheets()}>prueba esto</Link>
            </div>
            
            <div>
                <h1> Bienvenid@ {token.name}</h1>
                <h2>Tus alumnos</h2>
                <div className="students">{this.myStudents()}</div>
            </div>
            
            <body>
                
            </body>
            </>

        )
    }
}
