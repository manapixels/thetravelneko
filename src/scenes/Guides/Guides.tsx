import { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, Input } from '@chakra-ui/react'
import styled from 'styled-components'

import ProfileListItem from './components/ProfileListItem'
import Map from './components/Map'
import Marker from './components/Marker'
import CalendarBlank from './images/CalendarBlank.svg'
import FlyingSaucer from './images/FlyingSaucer.svg'
import MapPin from './images/MapPin.svg'
import MagnifyingGlass from './images/MagnifyingGlass.svg'
import Funnel from './images/Funnel.svg'
import { getProfiles } from '../../services/profile/get-profiles'

const SearchWrapper = styled.div`
   display: flex;
   border: 1px solid var(--chakra-colors-black);
   border-radius: var(--chakra-radii-xl);
   background: white;

   input {
      border: none;

      &:focus {
         box-shadow: none;
      }
   }

   .section-icon {
      border-radius: var(--chakra-radii-xl);
      background: var(--chakra-colors-lightGray-300);
      padding-left: 0.5rem;
      padding-right: 0.5rem;
   }
`

const Guides = () => {
   const [address, setAddress] = useState('')
   const [searchInput, setSearchInput] = useState('')
   const [fromDate, setFromDate] = useState('')
   const [toDate, setToDate] = useState('')
   const [profiles, setProfiles] = useState([])

   useEffect(() => {
      document.title = `thetravelneko · Find local guides`
   }, [])

   useEffect(() => {
      const handleGetProfile = async () => {
         const result = await getProfiles()
         if (result && result.profiles && result.profiles.items) {
            setProfiles(result.profiles.items)
         }
      }
      handleGetProfile()
   }, [address])

   return (
      <Flex>
         <Box flexGrow={2} width="30vw" mr={8}>
            <Box position="sticky" top="2rem">
               <Map setAddress={setAddress} />
            </Box>
         </Box>
         <Box flexGrow={1}>
            <Flex mb={6}>
               <SearchWrapper>
                  <Image src={MapPin} className="section-icon" alt="" />
                  <Input
                     type="text"
                     placeholder="Search countries..."
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     fontSize="2xl"
                     fontWeight="bold"
                     width="10rem"
                  />
                  <Box alignItems="center" d="flex" mr={5}>
                     <Button size="sm" p={1} variant="outline">
                        <Image src={FlyingSaucer} alt="" />
                     </Button>
                  </Box>
                  <Image src={CalendarBlank} className="section-icon" alt="" />
                  <Input
                     type="text"
                     placeholder="From"
                     value={fromDate}
                     onChange={(e) => setFromDate(e.target.value)}
                     width="8rem"
                  />
                  <Box alignItems="center" d="flex">
                     {' · '}
                  </Box>
                  <Input
                     type="text"
                     placeholder="To"
                     value={toDate}
                     onChange={(e) => setToDate(e.target.value)}
                     width="8rem"
                     borderRadius="xl"
                  />
               </SearchWrapper>

               <Button variant="black" ml={4} onClick={() => {}}>
                  <Image src={MagnifyingGlass} alt="" />
               </Button>
               <Button variant="outline" ml={4} onClick={() => {}}>
                  <Image
                     src={Funnel}
                     alt=""
                     width="20px"
                     height="20px"
                     mr={1}
                  />
                  Filter
               </Button>
            </Flex>

            {profiles.map((p, i) => (
               <Box key={i} mb={6}>
                  <ProfileListItem profile={p} />
               </Box>
            ))}
         </Box>
      </Flex>
   )
}

export default Guides
