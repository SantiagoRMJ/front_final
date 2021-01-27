import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './LayoutStudent.css';



export default class LayoutStudent extends Component {
    constructor(props){
        super(props)

        this.state = {
            class: '',
            sheets: []
        };
    };
    componentDidMount = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            this.setState({class: token.class});
            const mySheets = await axios.get(`http://localhost:3000/sheets/${token.id}`);
            this.setState({sheets: mySheets.data.sheet});
            
        }catch(err){
            console.log(err);
        };
    };
    mySheets = () => {
        if(this.state.sheets[0]){
            return(
                this.state.sheets.map(sheet => {
                    if(sheet.status === false) 
                    return(
                        <div className="body" key={sheet._id}>
                            <Link onClick={() => this.clickSheet(sheet)}>{sheet.title}</Link> 
                        </div>
                    )
                }))         
        }
    };
    clickSheet = (sheet) => {
        this.props.history.push('/ficha');
        localStorage.setItem('sheetData', JSON.stringify(sheet));
    }

    render() {
        const token = JSON.parse(localStorage.getItem('token'))

        const logOut = () =>{
            localStorage.clear()
        }

        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
            </div>
            <div className="show-sheets">
                <h1> Bienvenid@ {token.name}</h1>
                <h2>Si tienes fichas asignadas apraeceran a continuación:</h2>
                <Link>{this.mySheets()}</Link>
            </div>
            </>

        )
    }
}
