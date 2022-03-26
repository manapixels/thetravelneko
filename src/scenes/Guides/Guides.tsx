import { useState } from 'react'
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

const SearchWrapper = styled.div`
   display: flex;
   border: 1px solid var(--chakra-colors-black);
   border-radius: var(--chakra-radii-xl);

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

   return (
      <Flex>
         <Box flexGrow={2} width="30vw" mr={8}>
            <Map setAddress={setAddress} />
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
                     width="12rem"
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
                     width="8.5rem"
                  />
                  <Box alignItems="center" d="flex">
                     {' · '}
                  </Box>
                  <Input
                     type="text"
                     placeholder="To"
                     value={toDate}
                     onChange={(e) => setToDate(e.target.value)}
                     width="8.5rem"
                  />
               </SearchWrapper>

               <Button variant="black" ml={4} onClick={() => {}}>
                  <Image src={MagnifyingGlass} alt="" />
               </Button>
               <Button variant="outline" ml={4} onClick={() => {}}>
                  <Image src={Funnel} alt="" width="20px" height="20px" mr={1} />Filter
               </Button>
            </Flex>
            <ProfileListItem profile={dummyProfile} />
         </Box>
      </Flex>
   )
}

const dummyProfile = {
   id: '123',
   name: 'Lora Srna',
   bio: "Hello, My name is Lora Srna. I'm from Northern Croatia, and a local of Zagreb and Varazdin. I've been working as a tour guide for a number of years now, guiding to every part of Croatia, as well as other countries in the region, such as Bosnia, Slovenia, Montenegro, and Austria.",
   location: 'Zagreb, Croatia',
   timeZoneUtc: 1,
   website: 'https://lorasrna.com',
   twitterUrl: 'https://twitter.com/lorasrna',
   picture: {
      original: {
         url: 'https://i.imgur.com/M2CoXGx.jpg'
      }
   },
   handle: 'lorasrna',
   ownedBy: '0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245',
   languages: [
      { name: 'Croatian', level: 5 },
      { name: 'English', level: 3 },
   ],
   reviews: {
      count: 11,
      rating: 4,
   },
}

export default Guides
