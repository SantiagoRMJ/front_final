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
            const user = JSON.parse(localStorage.getItem('user'));
            const token = JSON.parse(localStorage.getItem('token'));
            if(!token) this.props.history.push('/')
            this.setState({class: user.class});
            const mySheets = await axios.get(`https://back-easy-homework.herokuapp.com/sheets/${user._id}`, {headers: {token}});
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
        const user = JSON.parse(localStorage.getItem('user'))

        const logOut = () =>{
            localStorage.clear()
        }

        return (
            <>
            <div className="nav-container">
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
            </div>
            <div className="show-sheets">
                <h1> Bienvenid@ {user.name}</h1>
                <h2>Si tienes fichas asignadas apraeceran a continuación:</h2>
                <Link>{this.mySheets()}</Link>
            </div>
            </>

        )
    }
}
