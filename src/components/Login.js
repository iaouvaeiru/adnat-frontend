import React, {useState} from 'react'
import {Card, Form, Button} from 'semantic-ui-react'
import { Switch, Link } from 'react-router-dom'

export default function Login(props) {

    const [formData, setFormData]=useState({
        email_address:'',
        password:''
        })
    
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            email_address: formData.email_address,
            password: formData.password
        })
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email_address: formData.email_address,
                password: formData.password
            })
        })
        .then(res => res.json())
        .then(props.handleResponse)
        .then(res => console.log("login response", res))
    }

    return (
        <div className='login'>
            <Card >
                <h1 className='cardHeader'>Log in</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Field className='inputField'>
                        <label>Email Address</label>
                        <input 
                            type='text' 
                            name='email_address' 
                            placeholder='Email Address' 
                            value={formData.email_address} 
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='inputField'>
                        <label>Password</label>
                        <input 
                            placeholder="Password" 
                            name='password' 
                            type='password' 
                            value={formData.password} 
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <br />
                    <Button fluid color='black' type='submit'>Submit</Button>
                </Form>
            </Card>
            <div>
                <Switch>
                    <Link to='/signup'>
                        <Button fluid color='blue'>Create an Account</Button>
                    </Link>
                </Switch>
            </div>
        </div>
    )
}
