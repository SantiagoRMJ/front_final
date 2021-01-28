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
            const user = JSON.parse(localStorage.getItem('user'))
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                const mySheets = await axios.get(`https://back-easy-homework.herokuapp.com/sheets/?=${user.id}`, {headers:{token}});
                console.log("MYSHEETS.DATA", mySheets.data);
                this.setState({sheets: mySheets.data});
            }catch(err){
                console.log(err)
            }
        }   
        sheets(){
            const user = JSON.parse(localStorage.getItem('user'))
            if(this.state.sheets[0]){
                return(
                    this.state.sheets.map(sheet => {
                        return(
                            <div className="home" key={user.id}>
                                <a href={`https://back-easy-homework.herokuapp.com//sheets/?=${user.id}`}> {sheet.title} </a>
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