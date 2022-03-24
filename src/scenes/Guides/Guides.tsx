import { Box } from '@chakra-ui/react'
import ProfileListItem from './components/ProfileListItem'
import Map from './components/Map'

const Guides = () => {
   return (
      <Box>
         <Map />
         <ProfileListItem profile={dummyProfile} />
      </Box>
   )
}

const dummyProfile = {
   id: '111',
   name: 'Lora Srna',
   location: 'Zagreb, Croatia',
   bio: "Hello, My name is Lora Srna. I'm from Northern Croatia, and a local of Zagreb and Varazdin. I've been working as a tour guide for a number of years now, guiding to every part of Croatia, as well as other countries in the region, such as Bosnia, Slovenia, Montenegro, and Austria.",
   handle: 'lorasrna',
   website: 'https://lorasrna.com',
   twitterUrl: 'https://twitter.com/lorasrna',
   ownedBy: '0x359F508f40bd2f2ed2C17814b28c915a65B4F74f',
}

export default Guides
