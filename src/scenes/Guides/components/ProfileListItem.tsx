import {
   Box,
   Button,
   Image,
   Flex,
   useDisclosure,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Avatar,
   Tabs,
   Tab,
   TabList,
   TabPanels,
   TabPanel,
} from '@chakra-ui/react'
import styled from 'styled-components'

import { ProfileType } from '../../../types/Profile'
import ArrowRight from '../images/ArrowRight.svg'
import ChatTeardropDots from '../images/ChatTeardropDots.svg'
import Heart from '../images/Heart.svg'
import { ReactComponent as Star } from '../images/Star.svg'
import { ReactComponent as MapPin } from '../images/MapPin.svg'
import { ReactComponent as Play } from '../images/Play.svg'
import { calcCurrTimeInTimeZone, formatAMPM } from '../../../helpers/date'
import YouTubeEmbed from '../../../components/YouTubeEmbed'

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

const AvatarWrapper = styled.button`
   position: relative;
   border-radius: 50%;

   &:before {
      content: '';
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0.1rem solid var(--chakra-colors-lightGray-400);
      transform: scale(1.2);
      transition: border 0.3s ease-in-out 0s;
      z-index: -1;
   }

   img {
      border-radius: 50%;
   }

   svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      stroke: white;
   }

   .overlay {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
   }

   &:hover {
      &:before {
         border-color: black;
      }
      svg {
         stroke: black;
      }
      .overlay {
         background: rgba(255, 255, 255, 0.5);
      }
   }
`

const ProfileListItem = ({ profile }: { profile: ProfileType }) => {
   const {
      id,
      name,
      bio,
      location,
      timeZoneUtc = dummyTimeZoneUtc,
      website,
      twitterUrl,
      picture: picObject,
      handle,
      ownedBy,
      languages = dummyLanguages,
      reviews = dummyReviews,
   } = profile

   const picture = picObject && picObject.original && picObject.original.url

   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Flex
         maxW="2xl"
         borderWidth="1px"
         borderRadius="lg"
         position="relative"
         p={8}
         background="white"
      >
         <Box width="60%" minWidth="20rem" mr={3}>
            <Flex mb={3}>
               <Box mr={4}>
                  <AvatarWrapper onClick={onOpen}>
                     {picture ? (
                        <Image
                           src={`https://gateway.pinata.cloud/ipfs/${picture}`}
                           alt=""
                           width="5rem"
                           height="5rem"
                        />
                     ) : (
                        <Avatar
                           width="5rem"
                           height="5rem"
                           name={name}
                           bg="lightGray.500"
                        />
                     )}
                     <Play />
                     <Box className="overlay"></Box>
                  </AvatarWrapper>
               </Box>
               <Box>
                  <Flex mb={1} alignItems="center">
                     <Box fontSize="110%" mr={2}>
                        {name}
                     </Box>
                     <Box color="lightGray.900" fontSize="md">
                        @{handle}
                     </Box>
                  </Flex>
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
                           `(${formatAMPM(
                              calcCurrTimeInTimeZone(timeZoneUtc)
                           )})`}
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
                  <Flex
                     alignItems="center"
                     flexWrap="nowrap"
                     whiteSpace="nowrap"
                  >
                     {languages &&
                        languages.map((l) => (
                           <Flex alignItems="center" mr={2} key={l.name}>
                              <Box color="darkGray.400" fontSize="md" mr={1}>
                                 {l.name}
                              </Box>
                              <Flex>
                                 {Array.from(Array(5), (e, i) => (
                                    <Box
                                       key={`${l.name}-${i}`}
                                       borderRadius=".2rem"
                                       bg={
                                          l.level < i + 1
                                             ? 'var(--chakra-colors-lightGray-500)'
                                             : 'var(--chakra-colors-darkGray-400)'
                                       }
                                       width=".15rem"
                                       height=".7rem"
                                       mr=".15rem"
                                    ></Box>
                                 ))}
                              </Flex>
                           </Flex>
                        ))}
                  </Flex>
               </Box>
            </Flex>

            {bio && <Box fontSize="md">{bio}</Box>}
         </Box>
         <Box width="40%">
            <Tabs>
               <TabList>
                  <Tab>Video Intro</Tab>
                  <Tab>Availability</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel p={4}>
                     <YouTubeEmbed embedId="xiZcGjn4Yko" />
                  </TabPanel>
                  <TabPanel p={4}></TabPanel>
               </TabPanels>
            </Tabs>
         </Box>

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

         <Modal onClose={onClose} size="xl" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader></ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <YouTubeEmbed embedId="aWHhzUjVS84" />
               </ModalBody>
               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>
      </Flex>
   )
}

const dummyTimeZoneUtc = 8
const dummyLanguages = [
   { name: 'English', level: 5 },
   { name: 'Mandarin Chinese', level: 4 },
]
const dummyReviews = {
   count: 11,
   rating: 4,
}

export default ProfileListItem
