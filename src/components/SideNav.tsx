import { Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import './SideNav.scss'

const SideNav = () => {
   return (
      <Box className="sidenav">
         <Box className="nav-section">
            <Box className="header">FIND</Box>
            <NavLink to="/guides">Local tour guides</NavLink>
            <NavLink to="/tours">Local tours</NavLink>
            <NavLink to="/buddies">Travel buddies</NavLink>
            <NavLink to="/drivers">Drivers</NavLink>
         </Box>

         <Box className="nav-section">
            <Box className="header">My Trips</Box>
            <NavLink to="/plans/create">Create travel plan</NavLink>
            <NavLink to="/plans/upcoming">Upcoming trips</NavLink>
            <NavLink to="/plans/ended">Ended</NavLink>
         </Box>
      </Box>
   )
}

export default SideNav
