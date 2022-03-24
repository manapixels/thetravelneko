import { Box, Image, Badge } from '@chakra-ui/react'

import { ProfileType } from '../../../types/Profile'

const ProfileListItem = ({ profile }: { profile: ProfileType }) => {
   const {
      id,
      name,
      bio,
      location,
      website,
      twitterUrl,
      picture,
      handle,
      ownedBy,
   } = profile

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

export default ProfileListItem
