import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({ children }) => {
    const colorKey = {
        Fashion: "primary",
        Travel: "success",
        Fitness: "danger",
        Food: "warning",
        Tech: "info",
        Sports: "dark",
        Random: "light bg-dark",
        Literature: "secondary",
    }
  return (
    <>
      <h5>
          <MDBBadge color={ !colorKey[children] ? "light text-dark" : colorKey[children] }>{children}</MDBBadge>
      </h5>
    </>
  )
}

export default Badge