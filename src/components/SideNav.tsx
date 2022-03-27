import { Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import './SideNav.scss'

const SideNav = () => {
   return (
      <Box className="sidenav">
         <Box className="nav-section">
            <Box className="header">FIND</Box>
            <NavLink to="/guides">Local tour guides</NavLink>
            <NavLink to="/guides">Local tours</NavLink>
            <NavLink to="/guides">Accommodations</NavLink>
            <NavLink to="/guides">Travel buddies</NavLink>
            <NavLink to="/guides">Drivers</NavLink>
         </Box>

         <Box className="nav-section">
            <Box className="header">My Trips</Box>
            <NavLink to="/guides">Create travel plan</NavLink>
            <NavLink to="/guides">Upcoming trips</NavLink>
            <NavLink to="/guides">Ended</NavLink>
         </Box>
      </Box>
   )
}

export default SideNav
