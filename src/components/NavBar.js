import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(props) {

    const Login = () => {
        return <NavLink to='/login' style={{ float: 'right', marginRight: '50px', fontSize: '15pt', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}}>Login</NavLink>
    }

    const clearToken = () => {
        props.setState({
            name: "",
            organisation: "",
            id: 0,
            token: ""
        })
        localStorage.clear()
    }

    const Logout = () => {
        return <NavLink to='/login' style={{ float: 'right', marginRight: '50px', fontSize: '15pt', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}} onClick={clearToken}>logged in as {props.state.name}. Logout</NavLink>
    }

    const editProfile = () => {
        return <NavLink to='/profile' style={{ float: 'right', marginRight: '50px', fontSize: '15pt', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}}>Edit Profile</NavLink>
    }

    return (
        <div className="nav">
            {props.state.token.length > 0 ? Logout() : Login() }
            {props.state.token.length > 0 ? editProfile() : null }
        </div>
    )
}
