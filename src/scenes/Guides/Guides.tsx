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
   id: '123',
   name: 'Lora Srna',
   bio: "Hello, My name is Lora Srna. I'm from Northern Croatia, and a local of Zagreb and Varazdin. I've been working as a tour guide for a number of years now, guiding to every part of Croatia, as well as other countries in the region, such as Bosnia, Slovenia, Montenegro, and Austria.",
   location: 'Zagreb, Croatia',
   timeZoneUtc: 1,
   website: 'https://lorasrna.com',
   twitterUrl: 'https://twitter.com/lorasrna',
   picture: 'https://i.imgur.com/M2CoXGx.jpg',
   handle: 'lorasrna',
   ownedBy: '0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245',
   languages: [{ name: 'Croatian', level: 5 }, { name: 'English', level: 3 }],
   reviews: {
      count: 11,
      rating: 4,
   },
}

export default Guides
