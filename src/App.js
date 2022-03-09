import './App.css';
import React, { useState, useEffect } from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import OrganisationList from './components/OrganisationList'
import NavBar from './components/NavBar'

function App(props) {

  const [organisations, setOrganisations] = useState([])

  const [state, setState] = useState({
      name: "",
      organisation: "",
      id: 0,
      token: ""
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
        token: resp.token
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

  return (
    <div>
      <NavBar 
        state = {state}
        setState = {setState}
      />
      <Switch>
        <Route path={'/login'} element={<Login />}
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
        <Route path={'/organisations'}
          render={routerProps => {
            return <div>
              <OrganisationList
                {...routerProps}
                state={state}
                organisations={organisations}>
              </OrganisationList>
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
