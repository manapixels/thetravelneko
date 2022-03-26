import { Box, Image, Badge } from '@chakra-ui/react'

import { ProfileType } from '../../../../../types/Profile'

const ProfileItem = ({ profile }: { profile: ProfileType }) => {
   const {
      id,
      name,
      bio,
      location,
      website,
      twitterUrl,
      picture: picObject,
      handle,
      coverPicture,
      ownedBy,
      stats,
   } = profile
   const {
      totalFollowers,
      totalFollowing,
      totalPosts,
      totalComments,
      totalMirrors,
      totalPublications,
      totalCollects,
   } = stats || {}

   const picture = picObject && picObject.original && picObject.original.url

   return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
         {picture && (
            <Image
               src={`https://gateway.pinata.cloud/ipfs/${picture}`}
               alt=""
               width="4.4rem"
            />
         )}

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

export default ProfileItem
