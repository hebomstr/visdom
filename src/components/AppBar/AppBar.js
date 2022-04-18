import React from 'react'
import './AppBar.css'
import { HashLink as Link } from 'react-router-hash-link'

const AppBar = ({ date }) => {

  console.log('Appbar render')

  return (
    <div className="appbar">
        <div>
            <h1 className="logo">Visdom</h1>
        </div>
        <div style={{width:"250px", display: "flex", justifyContent: "space-evenly", marginTop: "auto", marginBottom: "auto"}}>
          <nav><Link smooth to="/"><button className="nav-item">COURSES</button></Link></nav>
          <nav><Link smooth to="/"><button className="nav-item">LOGOUT</button></Link></nav>
        </div>
    </div>
  )
}

export default AppBar