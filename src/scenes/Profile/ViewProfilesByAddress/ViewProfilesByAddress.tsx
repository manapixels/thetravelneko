import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getProfiles } from '../../../services/profile/get-profiles'

import ProfileItem from './components/ProfileItem'
import { ProfileType } from '../../../types/Profile'

const ViewProfilesByAddress = () => {
   let { address } = useParams()
   const [profiles, setProfiles] = useState([])

   useEffect(() => {
      const handleGetProfile = async () => {
         const result = await getProfiles()
         if (result && result.profiles && result.profiles.items) {
            setProfiles(result.profiles.items)
         }
      }
      handleGetProfile()
   }, [address])

   console.log(profiles)

   return (
      <Box>
         {profiles.map((profile: ProfileType, i) => (
            <ProfileItem key={profile.id || i} profile={profile} />
         ))}
      </Box>
   )
}

export default ViewProfilesByAddress
