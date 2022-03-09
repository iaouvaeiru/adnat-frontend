import React from 'react'
import Organisation from './Organisation'

export default function OrganisationList(props) {
    let renderOrgs = props.organisations.map(orgObj => {
        return <Organisation 
            key={orgObj.id}
            name={orgObj.name}
            hourly_rate={orgObj.hourly_rate}
            state={props.state}
        />
    })
  return (
    <span><h2>OrganisationList</h2>
        <br></br>
        <span>
            {props.state.organisation ? `you are part of ${props.state.organisation.name}` : 'please join an organisation'}
        </span>
        <h3>Organisations</h3>
        {renderOrgs}
        <br/>
        <br/>
        <div>
            <button>Create Organization</button>
        </div>
    </span>
  )
}
