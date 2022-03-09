import React, {useState} from 'react'
import {Card, Form, Button} from 'semantic-ui-react'

export default function EditProfile(props) {
    console.log(props)

    const [formData, setFormData]=useState({
        email_address:'',
        name: '',
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
        fetch("http://localhost:3000/edit", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: props.state.id,
                name: formData.name,
                email_address: formData.email_address,
                password: formData.password
            })
        })
        .then(res => res.json())
        .then(userInfo => props.updateUserInfo(userInfo))
    }

    return (
        <div className='login'>
            <Card >
                <h1 className='cardHeader'>Edit Profile</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Field className='inputField'>
                        <label>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder={props.state.name} 
                            value={formData.name} 
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='inputField'>
                        <label>Email Address</label>
                        <input 
                            type='text' 
                            name='email_address' 
                            placeholder={props.state.email_address} 
                            value={formData.email_address} 
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='inputField'>
                        <label>Password</label>
                        <input 
                            placeholder="Enter New Password" 
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
            </div>
        </div>
    )
}
