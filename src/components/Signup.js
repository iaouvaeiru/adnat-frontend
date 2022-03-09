import React, {useState} from 'react'
import {Card, Form, Button} from 'semantic-ui-react'
import { Switch, Link } from 'react-router-dom'

export default function Login(props) {

    const [formData, setFormData]=useState({
        name: "",
        email_address:'',
        password:'',
        passwordConfirm:'',
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
        if(formData.password !== formData.passwordConfirm){
            alert("passwords do not match")
        } else{
            fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                email_address: formData.email_address,
                password: formData.password
            })
            })
            .then(res => res.json())
            .then(alert("Registered successfully"))
        }
    }

    

    return (
        <div className='login'>
            <Card >
                <h1 className='cardHeader'>Sign up</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Field className='inputField'>
                        <label>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='Name' 
                            value={formData.name} 
                            onChange={handleChange}
                        />
                    </Form.Field>
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
                    <Form.Field className='inputField'>
                        <label>Confirm Password</label>
                        <input 
                            placeholder="Confirm Password" 
                            name='passwordConfirm' 
                            type='password' 
                            value={formData.passwordConfirm} 
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <br />
                    <Button fluid color='black' type='submit'>Submit</Button>
                </Form>
            </Card>
            <div>
            </div>
        </div>
    )
}
