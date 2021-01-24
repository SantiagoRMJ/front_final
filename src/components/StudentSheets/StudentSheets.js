import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


 class StudentSheets extends Component {
    constructor(props){
        super(props)

        this.state = {
            sheets: [],
        }
        }
        clickElementoSeleccionado(sheet){
            console.log(this.props)
            this.props.history.push('/ficha');
            localStorage.setItem('sheet', JSON.stringify(sheet));
        }
        async componentDidMount(){
            const token = JSON.parse(localStorage.getItem('token'))
            try {
                const mySheets = await axios.get(`http://localhost:3000/sheets/?=${token.id}`);
                console.log("MYSHEETS.DATA", mySheets.data);
                this.setState({sheets: mySheets.data});
            }catch(err){
                console.log(err)
            }
        }   
        sheets(){
            const token = JSON.parse(localStorage.getItem('token'))
            if(this.state.sheets[0]){
                return(
                    this.state.sheets.map(sheet => {
                        return(
                            <div className="home" key={token.id}>
                                <a href={`http://localhost:3000/sheets/?=${token.id}`}> {sheet.title} </a>
                            </div>
                        
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   
        }
    render() {
        return (
             <div className="sheets"> 
                 <div className="sheets_show" >{this.sheets()}</div>
                 <Link to="/alumno">Volver</Link>
             </div>
             )
    }
}

export default StudentSheets;