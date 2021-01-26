import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import ShowSheets from '../ShowSheets/ShowSheets';
import './LayoutTeacher.css'



export default class LayoutTeacher extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [],
            class: "",
            sheets: []
        }
    }
    componentDidMount = async ()=>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            this.setState({class: token.class});
            const myStudents = await axios.get(`http://localhost:3000/student/${token.class}`);
            this.setState({students: myStudents.data.students});
            if(!token) this.props.history.push('/')
        }catch(err){
            console.log(err)
        }
    }
    logOut = () =>{
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    clickStudent = (student) => {
        console.log(this.props)
        this.props.history.push('/profesor/alumno');
        localStorage.setItem('studentData', JSON.stringify(student));
    }

    myStudents = () => {
        if(this.state.students[0]){
            return(
                this.state.students.map(student => {
                    return(
                        <div className="body" key={student._id}>
                            <Link onClick={() => this.clickStudent(student)}>{this.capitalize(student.name)}</Link> 
                        </div>
                    )
                }))         
        }else{
            return(<div>CARGANDO LOS DATOS.</div>)
        }   
    }

    

    render() {
        const token = JSON.parse(localStorage.getItem('token'))
        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/profesor/fichas">Crear ficha</Link>
                 
                 <Link className="link" to="/" onClick={()=> this.logOut()}>Cerrar sesion</Link>
            </div>
            
            <div className="show-students">
                <h1> Bienvenid@ {this.capitalize(token.name)}</h1>
                <h2>Tus alumnos</h2>
                <div className="students" >{this.myStudents()}</div>
            </div>
        
            </>

        )
    }
}
