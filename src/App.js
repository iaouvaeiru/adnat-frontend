import './App.css';
import React, { useState, useEffect } from 'react'
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import OrganisationList from './components/OrganisationList'
import NavBar from './components/NavBar'
import NewOrganisation from './components/NewOrganisation'
import EditProfile from './components/EditProfile'
import NewShift from './components/NewShift'

function App(props) {

  const [organisations, setOrganisations] = useState([])

  const [state, setState] = useState({
      name: "",
      organisation: {},
      id: 0,
      token: "",
      email_address: ''
  })

  const [shifts, setShifts] = useState([])

  useEffect(() => {
    if(localStorage.token){
      fetch('http://localhost:3000/me', {
        headers: {
          'authorization': localStorage.token
        }
      })
      .then(res => res.json())
      .then(handleResponse)
    }
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/shifts')
    .then(res => res.json())
    .then(shiftArray => setShifts(shiftArray))
  },[])

  console.log(organisations)
  console.log(shifts)
  console.log(state)

  useEffect(() => {
    fetch('http://localhost:3000/organisations')
    .then(res => res.json())
    .then(orgArray => setOrganisations(orgArray))
  },[])

  let handleResponse = (resp) => {
    console.log(resp)
    if(resp.token){
      setState({
        name: resp.user.name,
        organisation: resp.user.organisation,
        id: resp.user.id,
        token: resp.token,
        email_address: resp.user.email_address
      })
      localStorage.token = resp.token;
      if(resp.user.organisation == null){
        props.history.push("/organisations")
      } else {
        props.history.push(`/organisations/`)
      }
    } else {
      alert("Incorrect credentials, please try again")
    }
  }

  const addOrganisation = (newOrganisation) => {
    let copyOfOrganisations = [...organisations, newOrganisation]
    setOrganisations(copyOfOrganisations)
    setState({...state, organisation: newOrganisation})
  }

  const joinOrganisation = (organisation) => {
    setState({...state, organisation: organisation})
    // let copyOfShifts = shifts.filter(shiftObj => {
    //   if(shiftObj.user.id == state.id && shiftObj.user.organisation.id == state.organisation.id){
    //     return shiftObj
    //   } else {
    //     return shiftObj.user.id !== state.id
    //   }  
    // })
    // setShifts(copyOfShifts)
  }

  const leaveOrganisation = () => {
    setState({...state, organisation:''})
    let copyOfShifts = shifts.filter(shiftObj => {
      return shiftObj.user.id !== state.id
    })
    setShifts(copyOfShifts)
  }

  const updateOrganisation = (updatedOrganisation) => {
    let copyOfOrganisations = organisations.map(orgObj => {
      if(orgObj.id === updatedOrganisation.id){
        return updatedOrganisation
      } else {
        return orgObj
      }
    })
    setOrganisations(copyOfOrganisations)
  }

  const updateUserInfo = (updatedUser) => {
    setState({...state, 
      name: updatedUser.name,
      email_address: updatedUser.email_address
    })
  }

  const addShift = (newShift) => {
    let copyOfShifts = [...shifts, newShift]
    setShifts(copyOfShifts)
  }

  const createTable = () => {
    return (
      <div className="table">
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Shift Start</th>
            <th>Shift End</th>
            <th>Break (minutes)</th>
            <th>Hours Worked</th>
            <th>Shift Cost</th>
          </tr>
          {shifts.map(shift => {
            if(shift.user.organisation.id === state.organisation.id){
              let startDateTime = new Date(shift.start)
              let endDateTime = new Date(shift.finish)
              let date = startDateTime.toLocaleDateString()
              let startTime = startDateTime.toLocaleTimeString()
              let finishTime = endDateTime.toLocaleTimeString()
              let minutes = ((endDateTime) - (startDateTime)) / 60000
              return (
                <tr key={shift.id}>
                  <td>{shift.user.name}</td>
                  <td>{date}</td>
                  <td>{startTime}</td>
                  <td>{finishTime}</td>
                  <td>{shift.break_length}</td>
                  <td>{(minutes - shift.break_length)/60}</td>
                  <td>${(minutes - shift.break_length)/60 * shift.user.organisation.hourly_rate}</td>
                </tr>
              )
            }
          })}
        </table>
      </div>
    )
  }

  return (
    <div>
      <NavBar 
        state = {state}
        setState = {setState}
      />
      <Switch>
        <Route path={'/profile'}
          render={routerProps => {
            return <div>
              <EditProfile
                {...routerProps}
                updateUserInfo={updateUserInfo}
                state={state}
              >
              </EditProfile>
            </div>
          }}
        >
        </Route>
        <Route path={'/login'}
          render={routerProps => {
            return <div>
              <Login
                {...routerProps} setState={setState}
                handleResponse={handleResponse}>
              </Login>
            </div>
          }}
        >
        </Route>
        <Route path={'/signup'}
          render={routerProps => {
            return <div>
              <Signup
                {...routerProps}>
              </Signup>
            </div>
          }}>
        </Route>
        <Route path={'/organisations/:id'}>
        <Link to={'/organisations'}>
            <button>Back</button>
          </Link>
          {state.organisation ? createTable() : null}
          <Link to={'/newshift'}>
            <button>Add new shift</button>
          </Link>
        </Route>
        <Route path={'/newshift'}
          render={routerProps => {
            return <div>
              <NewShift
                {...routerProps}
                state={state}
                addShift={addShift}
              >
              </NewShift>
            </div>
          }}
        >
        </Route>
        <Route path={'/organisations'}
          render={routerProps => {
            return <div>
              <OrganisationList
                {...routerProps}
                updateOrganisation={updateOrganisation}
                leaveOrganisation={leaveOrganisation}
                joinOrganisation={joinOrganisation}
                state={state}
                organisations={organisations}>
              </OrganisationList>
            </div>
          }}>
        </Route>
        <Route path={'/neworganisation'}
          render={routerProps => {
            return <div>
              <NewOrganisation
                {...routerProps}
                addOrganisation={addOrganisation}
                state={state}
                organisations={organisations}>
              </NewOrganisation>
            </div>
          }}> 
        </Route>
        <Route path={'/'}>
          <div>
            Homepage
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
