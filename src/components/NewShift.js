import React, {useState} from 'react'

export default function NewShift(props) {
    const [formData, setFormData] = useState({
        date: '',
        start: '',
        finish: '',
        break_length: 0
    })

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        })
    }

    const handleSubmit = (e) => {
        let startTime = formData.date.toString() + ' ' + formData.start.toString()
        let finishTime = formData.date.toString() + ' ' + formData.finish.toString()
        e.preventDefault()
        fetch("http://localhost:3000/shifts", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                user_id: props.state.id,
                start: new Date(startTime).toISOString(),
                finish: new Date(finishTime).toISOString(),
                break_length: formData.break_length
            })
        })
        .then(res => res.json())
        .then(shiftObj => props.addShift(shiftObj))
        .then(() => {props.history.push(`/organisations/${props.state.organisation.id}`)})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Date:</label>
            <input type="text"
                    placeholder={"YYYY/MM/DD"}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
            />
            <label>Shift start time:</label>
            <input type="text"
                    placeholder='00:00:00 AM'
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
            />
            <label>Shift end time:</label>
            <input type="text"
                    placeholder='00:00:00 PM'
                    name="finish"
                    value={formData.finish}
                    onChange={handleChange}
            />
            <label>Break length (minutes):</label>
            <input type="number"
                    placeholder='00'
                    name="break_length"
                    value={formData.break_length}
                    onChange={handleChange}
            />
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}
