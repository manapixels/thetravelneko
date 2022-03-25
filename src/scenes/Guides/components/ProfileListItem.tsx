import { Box, Button, Image, Flex } from '@chakra-ui/react'
import styled from 'styled-components'

import { ProfileType } from '../../../types/Profile'
import ArrowRight from '../images/ArrowRight.svg'
import ChatTeardropDots from '../images/ChatTeardropDots.svg'
import Heart from '../images/Heart.svg'
import { ReactComponent as Star } from '../images/Star.svg'
import { ReactComponent as MapPin } from '../images/MapPin.svg'
import { calcCurrTimeInTimeZone, formatAMPM } from '../../../helpers/date'

const SideButtonsWrapper = styled.div`
   position: absolute;
   right: -2rem;
   top: 1rem;
   border: 1px solid var(--chakra-colors-lightGray-400);
   border-radius: var(--chakra-radii-md);
   background: white;

   button {
      height: auto;

    & > img {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
   }
}

   div {
      div {
         border-radius: 0.5rem;
      }
   }
`

const ProfileListItem = ({ profile }: { profile: ProfileType }) => {
   const {
      id,
      name,
      bio,
      location,
      timeZoneUtc,
      website,
      twitterUrl,
      picture,
      handle,
      ownedBy,
      languages,
      reviews,
   } = profile

   return (
      <Box
         maxW="sm"
         borderWidth="1px"
         borderRadius="lg"
         position="relative"
         p={8}
      >
         <Flex mb={3 }>
            <Box mr={4}>
               <Image src={picture} alt="" width="4.4rem" mb={2} />
               <Box color="lightGray.900" fontSize="md">@{handle}</Box>
            </Box>
            <Box>
               <Box fontSize="110%" mb={1}>
                  {name}
               </Box>
               <Flex
                  color="lightGray.900"
                  alignItems="center"
                  fontSize="md"
                  mb={1}
               >
                  <MapPin height="1rem" />
                  <Box ml={1} mr={1}>
                     {location}
                  </Box>
                  <Box>
                     {timeZoneUtc &&
                        `(${formatAMPM(calcCurrTimeInTimeZone(timeZoneUtc))})`}
                  </Box>
               </Flex>
               {reviews && (
                  <Flex alignItems="center" mb={1}>
                     {reviews.rating !== null &&
                        Array.from(Array(5), (e, i) => (
                           <Star
                              fill={
                                 reviews.rating < i + 1
                                    ? 'var(--chakra-colors-lightGray-400)'
                                    : 'var(--chakra-colors-warning-300)'
                              }
                              style={{
                                 marginRight: '.3rem',
                                 height: '0.9rem',
                                 width: '0.9rem',
                              }}
                              key={`star-${i}`}
                           />
                        ))}
                     <Box color="lightGray.900" fontSize="md">
                        {reviews.count} reviews
                     </Box>
                  </Flex>
               )}
               <Flex alignItems="center">
                  {languages &&
                     languages.map((l) => (
                        <Flex alignItems="center" mr={2} key={l.name}>
                           <Box color="darkGray.400" fontSize="md" mr={1}>{l.name}</Box>
                           <Flex>{Array.from(Array(5), (e, i) => (
                              <Box key={`${l.name}-${i}`} borderRadius=".2rem" bg={l.level < i + 1
                                 ? 'var(--chakra-colors-lightGray-500)'
                                 : 'var(--chakra-colors-darkGray-400)'} width=".15rem" height=".7rem" mr=".15rem"></Box>
                           ))}</Flex>
                        </Flex>
                     ))}
               </Flex>
            </Box>
         </Flex>

         {bio && <Box fontSize="md">{bio}</Box>}

         <SideButtonsWrapper>
            <Button d="block" variant="white">
               <Image src={ChatTeardropDots} alt="" />
            </Button>
            <Button d="block" variant="white">
               <Image src={Heart} alt="" />
            </Button>
            <Button d="block" variant="black">
               <Image src={ArrowRight} alt="" />
            </Button>
         </SideButtonsWrapper>
      </Box>
   )
}

export default ProfileListItem
