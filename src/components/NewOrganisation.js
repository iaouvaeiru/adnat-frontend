import React, {useState} from 'react'
import {Card, Form, Button} from 'semantic-ui-react'

export default function NewOrganisation(props) {

    const [formData, setFormData] = useState({
        name: '',
        hourly_rate: 0
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
        fetch("http://localhost:3000/organisations", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                hourly_rate: formData.hourly_rate,
                user_id: props.state.id
            })
        })
        .then(res => res.json())
        .then(newOrg => props.addOrganisation(newOrg))
        .then(() => props.history.push('/organisations'))
    }

  return (
    <div className='createOrganisation'>
        <Card fluid>
        <h1 className='cardHeader'>Create an organisation</h1>
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
                    <label>Hourly Rate</label>
                    <input 
                        placeholder='0' 
                        name='hourly_rate' 
                        type='number' min='0' step='1'
                        value={formData.hourly_rate} 
                        onChange={handleChange}
                    />
                </Form.Field>
                <br />
                <Button fluid color='black' type='submit'>Submit</Button>
            </Form>
        </Card>
    </div>
  )
}
