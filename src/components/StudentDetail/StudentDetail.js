import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';
import './StudentDetail.css'



export default class StudentDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            sheets: []
        };
        };
        componentDidMount = async () => {
            try{
                const data = JSON.parse(localStorage.getItem('studentData'));
                const sheets = await axios.get(`http://localhost:3000/sheets/${data._id}`);
                this.setState({data: data, sheets: sheets});
                    
            }catch(err){
                console.log(err);
            }
        };
        capitalize = (s) => {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
          }

        goBack =() => {
            localStorage.removeItem('studentData');
            this.props.history.push('/profesor');
        }
        clickSheet = (sheet) => {
            localStorage.setItem('sheetData', JSON.stringify(sheet));
        }
        logOut = () =>{
            localStorage.removeItem('token');
            this.props.history.push('/')
        }
        
        pruebas(){
            console.log("DATA", this.state.data)
            console.log("SHEETS", this.state.sheets)
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
                
                
                {this.state.sheets?.data?.sheet?.map(sheet => {
                    if(sheet.status === true){
                        return(
                            <div className="body" key={sheet._id}>
                                <Link onClick={() => this.clickSheet(sheet)}
                                      to="/profesor/alumno/correccion"  
                                      style={{color: "green"}}>
                                          {this.capitalize(sheet.title)}
                                </Link>
                            </div>
                        )}
                        else{
                            return(
                                <div className="body" key={sheet._id}>
                                    <div style={{color: "red"}} >{this.capitalize(sheet.title)}</div>
                                </div>
                            )
                        }
                         })}
                
                <button onClick={() => this.goBack()}>Atras</button>
                <button onClick={() => this.pruebas()}>PRUEBAS</button>
                </div>
            </>
                
        )
    }
}