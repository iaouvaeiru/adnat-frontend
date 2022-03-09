import React, {useState} from 'react'
import {Card, Form, Button} from 'semantic-ui-react'

export default function EditOrganisation(props) {
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
    console.log({
        name: formData.name,
        hourly_rate: formData.hourly_rate
    })
      fetch(`http://localhost:3000/organisations/${props.organisation.id}`, {
      method: "PATCH",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
          name: formData.name,
          hourly_rate: formData.hourly_rate
      })
      })
      .then(res => res.json())
      .then(alert("Registered successfully"))
  }


  return (
    <div>
      <Card >
        <h1 className='cardHeader'>Edit Organisation</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Field className='inputField'>
                <label>Name</label>
                <input 
                    type='text' 
                    name='name' 
                    placeholder={props.name} 
                    value={formData.name} 
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field className='inputField'>
                <label>Hourly Rate</label>
                <input 
                    placeholder={props.hourly_rate} 
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
