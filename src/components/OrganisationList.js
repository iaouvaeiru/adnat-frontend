import React from 'react'
import Organisation from './Organisation'
import {Switch, Link} from 'react-router-dom'

export default function OrganisationList(props) {
    console.log(props.state)
    let renderOrgs = props.organisations.map(orgObj => {
        return <Organisation 
            key={orgObj.id}
            name={orgObj.name}
            hourly_rate={orgObj.hourly_rate}
            state={props.state}
            joinOrganisation={props.joinOrganisation}
            updateOrganisation={props.updateOrganisation}
            id={orgObj.id}
            // organisation={orgObj}
        />
    })

    const handleClick = () => {
        fetch(`http://localhost:3000/leave`,{
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                id: props.state.id
            }),
        })
        .then(res => res.json())
        .then(() => props.leaveOrganisation())
    }

  return (
      <Switch>
        <span><h2>OrganisationList</h2>
            <br></br>
            <span>
                {props.state.organisation ? `You are part of ${props.state.organisation.name}` : 'please join an organisation'}
                {props.state.organisation ? <button onClick={handleClick}>leave organisation</button> : null}
                
                {props.state.organisation ? 
                    <Link to={`/organisations/${props.state.organisation.id}`}>
                        <button>View Shifts</button> 
                    </Link> : null}
                
            </span>
            <h3>Organisations</h3>
            {renderOrgs}
            <br/>
            <br/>
            <div>
                <Link to='/neworganisation'>
                    <button>Create Organization</button>
                </Link>
            </div>
        </span>
      </Switch>
  )
}
