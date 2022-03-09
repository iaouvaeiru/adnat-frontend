import React from 'react'

export default function Organisation(props) {
  return (
    <div className="organisationCard">
        <div>{props.name}</div>
        <div>Hourly wage: ${props.hourly_rate}</div>
        <button>join</button>
        <button>edit</button>
        <div> </div>
        <hr></hr>
    </div>
  )
}
