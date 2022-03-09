import React from 'react'
import ShiftTable from './ShiftTable'

export default function ShowShifts(props) {
    console.log(props.shifts)
    const matchingShift = props.shifts.map(shift => {
        console.log(shift)
    })
    console.log(matchingShift)
  return (
    <div>
        {/* <ShiftTable 
            key={matchingShift.user.organisation.id}
            shift={matchingShift}
        /> */}
    </div>
  )
}
