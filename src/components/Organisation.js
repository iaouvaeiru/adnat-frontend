import React, {useState} from 'react'


export default function Organisation(props) {
    console.log(props)

    const [showEditForm, setShowEditForm] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        hourly_rate: 0
    })

    const handleSetEditFormState = () => {
        setShowEditForm(!showEditForm)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/organisations/${props.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                hourly_rate: formData.hourly_rate
            }),
        })
        .then(res => res.json())
        .then(orgObj => props.updateOrganisation(orgObj))
        .then(() => {
            handleSetEditFormState()
        })
    }

    const renderEditForms = () => {
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text"
                           placeholder={props.name}
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                    />
                    <label>Hourly Rate:</label>
                    <input type="text"
                           placeholder={props.hourly_rate}
                           name="hourly_rate"
                           value={formData.hourly_rate}
                           onChange={handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <hr></hr>
            </div>
        )

    }

    const renderInformation = (props) => {
        return(
        <div className="organisationCard">
            <div>{props.name}</div>
            <div>Hourly wage: ${props.hourly_rate}</div>
            {props.state.organisation ? null : <button onClick={handleClick}>join</button>}
            <button onClick={handleSetEditFormState}>edit</button>
            <div> </div>
            <hr></hr>
        </div>
        )}

    const handleClick = () => {
        fetch(`http://localhost:3000/users/${props.state.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                organisation_id: props.id
            }),
        })
        .then(res => res.json())
        .then(orgObj => props.joinOrganisation(orgObj))
    }
  return (
    <div className="organisationCard">
        {showEditForm ? renderEditForms() : renderInformation(props)}
    </div>
  )
}
