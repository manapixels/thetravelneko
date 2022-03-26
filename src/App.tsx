import { Route, Routes, Navigate } from 'react-router-dom'

import { ChakraProvider, Box, Flex } from '@chakra-ui/react'
import { theme } from './theme'

import CreateProfile from './scenes/Profile/CreateProfile'
import UpdateProfile from './scenes/Profile/UpdateProfile'
import ViewProfile from './scenes/Profile/ViewProfile'
import ViewProfilesByAddress from './scenes/Profile/ViewProfilesByAddress'
import Guides from './scenes/Guides'
import Header from './components/Header'
import SideNav from './components/SideNav'
import "./App.scss"

export const App = () => {

   return (
      
      <ChakraProvider theme={theme}>
         <Box>
            <Header />
            <Flex px={8} py={6}>
               <Box mr={10}><SideNav /></Box>
               <Box flexGrow="1">
               <Routes>
                  <Route
                     path="/profile/create"
                     element={<CreateProfile />}
                  />
                  <Route
                     path="/profile/:handle/update"
                     element={<UpdateProfile />}
                  />
                  <Route
                     path="/profile/:handle"
                     element={<ViewProfile />}
                  />
                  <Route
                     path="/address/:address"
                     element={<ViewProfilesByAddress />}
                  />
                  <Route
                     path="/guides"
                     element={<Guides />}
                  />
                  <Route path="/" element={<Navigate to="/guides" replace />} />
               </Routes>
               </Box>
            </Flex>
         </Box>
      </ChakraProvider>
   )
}