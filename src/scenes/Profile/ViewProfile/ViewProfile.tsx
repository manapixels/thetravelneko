import { useEffect, useState } from 'react'
import { Box, Image, Badge } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getProfiles } from '../../../services/profile/get-profiles'
import { ProfileType } from '../../../types/Profile'

const ViewProfile = () => {
   let { handle: handleParam } = useParams()
   const [profile, setProfile] = useState<ProfileType>()

   useEffect(() => {
      const handleGetProfile = async () => {
         if (handleParam !== undefined) {
            const result = await getProfiles({ handles: [handleParam] })
            if (result && result.profiles && result.profiles.items && result.profiles.items[0]) {
               setProfile(result.profiles.items[0])
            }
         }
      }
      handleGetProfile()
   }, [handleParam])

   const {
      id,
      name,
      bio,
      location,
      website,
      twitterUrl,
      picture,
      handle,
      coverPicture,
      ownedBy,
      stats,
   } = profile || {}
   const {
      totalFollowers,
      totalFollowing,
      totalPosts,
      totalComments,
      totalMirrors,
      totalPublications,
      totalCollects,
   } = stats || {}

   return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
         <Image src={picture} alt="" />

         <Box p="6">
            <Box display="flex" alignItems="baseline">
               <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
               </Badge>
               <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
               >
                  {name} {handle}
               </Box>
            </Box>

            <Box
               mt="1"
               fontWeight="semibold"
               as="h4"
               lineHeight="tight"
               isTruncated
            >
               {name} {handle}
            </Box>

            <Box>
               {ownedBy}
               <Box as="span" color="gray.600" fontSize="sm">
                  / wk
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

export default ViewProfile
