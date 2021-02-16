import React from 'react'
import avatar from '../media/avatar.jpg'



function Sidebar() {

  return (
    <div className="Sidebar">
      <ul className="SideList">
        <img className="Avatar" src={avatar}></img>
        <li>Profile</li>
        <li>Mattia</li>
        <li>Dashboard</li>
        <li>Your Alumni</li>
      </ul>
    </div>
  )
}


export {Sidebar};