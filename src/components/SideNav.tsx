import { Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import './SideNav.scss'

const SideNav = () => {
   return (
      <Box className="sidenav">
         <Box className="nav-section">
            <Box className="header">FIND</Box>
            <NavLink to="/guides">Local tour guides</NavLink>
            <NavLink to="/">Local tours</NavLink>
            <NavLink to="/">Accommodations</NavLink>
            <NavLink to="/">Travel buddies</NavLink>
            <NavLink to="/">Drivers</NavLink>
         </Box>

         <Box className="nav-section">
            <Box className="header">My Trips</Box>
            <NavLink to="/">Create travel plan</NavLink>
            <NavLink to="/">Upcoming trips</NavLink>
            <NavLink to="/">Ended</NavLink>
         </Box>
      </Box>
   )
}

export default SideNav
