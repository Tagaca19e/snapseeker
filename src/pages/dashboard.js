import React from 'react'
import boostrap from 'boostrap'
export default function dashboard() {
  // TODO(etagaca): Impement dashboard.
  return (
      <div>dashboard
          <reactBoostrap.Navbar bg="dark" variant="dark">
              <reactBoostrap.Navbar.Brand href="#home">Navbar</reactBoostrap.Navbar.Brand>
              <Nav className="mr-auto nav_bar_wrapper">
              <reactBoostrap.NavDropDown title="Your Name" >
              </reactBoostrap.NavDropDown>
          </reactBoostrap.Navbar>
      </div>
  )
}
