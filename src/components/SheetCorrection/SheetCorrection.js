import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';




export default class SheetCorrection extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            sheet: {}
        };
        };
        componentDidMount = () => {
            try{
                const data = JSON.parse(localStorage.getItem('studentData'));
                const sheet = JSON.parse(localStorage.getItem('sheetData'));
                this.setState({data: data, sheet: sheet});
                    
            }catch(err){
                console.log(err);
            }
        };
        capitalize = (s) => {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
          }

        goBack = () => {
            localStorage.removeItem('sheetData');
            this.props.history.push('/profesor/alumno');
        }
        removeSheet = async () => {
            try{
            const sheet = JSON.parse(localStorage.getItem('sheetData'));
            const sheetId = sheet._id
            await axios.delete(`http://localhost:3000/sheets/${sheetId}`);
            this.props.history.push('/profesor/alumno');
            localStorage.removeItem('sheetData')
            }catch(err){
                console.log(err)
            }
        }
        logOut = () =>{
            localStorage.removeItem('token');
            this.props.history.push('/')
        }

        pruebas(){
            console.log("DATA", this.state.data)
            console.log("SHEET", this.state.sheet.answers)
        }
    

    render(){
        return (
            
            <>
                <div className="nav-container">
                    <Link className="link" to="/profesor/fichas">Crear ficha</Link>
                    <Link className="link" to="/" onClick={()=> this.logOut()}>Cerrar sesion</Link>
                </div>

                <div className="student">
                    <div className="name"> {this.capitalize(this.state.data?.name)} </div>
                    <h1>{this.state.sheet.title}</h1>
                    {this.state.sheet?.questions?.map((quest, index)=>{
                        return(
                        <>
                            <div key={quest}>
                            <h3>{quest}</h3>
                            <div>{this.state.sheet.answers[index]}</div>
                            </div>
                         </>
                         )})}
                

                
                <button onClick={() => this.goBack()}>Atras</button>
                <button onClick={() => this.removeSheet()}>Eliminar ficha</button>
                </div>
            </>
                
        )
    }
}