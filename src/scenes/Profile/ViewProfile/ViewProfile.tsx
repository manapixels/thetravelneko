import { useEffect, useState } from 'react'
import {
   Box,
   Image,
   Flex,
   Heading,
   Button,
   Select,
   Link,
   Text
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Calendar from 'react-calendar'
import { addYears, subYears } from 'date-fns'
import styled from 'styled-components'

import { ReactComponent as CaretLeft } from './images/CaretLeft.svg'
import { ReactComponent as CaretRight } from './images/CaretRight.svg'
import { ReactComponent as ChatTeardropDots } from './images/ChatTeardropDots.svg'
import { ReactComponent as MapPin } from './images/MapPin.svg'
import { ReactComponent as Star } from './images/Star.svg'
import { ReactComponent as Heart } from './images/Heart.svg'
import { ReactComponent as Export } from './images/Export.svg'
import { ReactComponent as BadgeGoogleLocalGuide } from './images/Badge_GoogleLocalGuide.svg'
import { ReactComponent as BadgeNekoguide } from './images/Badge_Nekoguide.svg'
import { ReactComponent as BadgeVerifiedUser } from './images/Badge_VerifiedUser.svg'
import worldMap from './images/worldmap.png'
import { getProfiles } from '../../../services/profile/get-profiles'
import { ProfileType } from '../../../types/Profile'
import {
   formatAMPM,
   isWithinRanges,
   calcCurrTimeInTimeZone,
} from '../../../helpers/date'

const today = new Date()
const currMonth = today.getMonth()
const oneYearFromNow = addYears(today, 1)
const oneYearBeforeNow = subYears(today, 1)
const disabledRanges = [[oneYearBeforeNow, today]]

const CoverImage = styled.div`
   background: url(${worldMap});
   height: 13rem;
   border-radius: var(--chakra-radii-lg);
`
const CalendarWrapper = styled.div`
   button.react-calendar__tile {
      color: var(--chakra-colors-darkGray-300);
      border-radius: 50%;
      box-sizing: content-box;
      white-space: nowrap;
      background: var(--chakra-colors-success-100);

      &:before {
         content: '';
         display: inline-block;
         vertical-align: middle;
         padding-top: 100%;
         height: 0;
      }

      &:disabled {
         background: var(--chakra-colors-lightGray-200);
         cursor: not-allowed;
      }

      &:hover:not(:disabled) {
         background: var(--chakra-colors-black);
         color: white;
      }
   }
   button.react-calendar__tile--active {
      &:not(:disabled) {
         background: var(--chakra-colors-black);
         color: white;
      }
   }
   .react-calendar {
      font-size: 90%;
   }
   .react-calendar__navigation {
      display: flex;
      padding: 1rem 0;
   }
   .react-calendar__navigation__label__labelText {
      color: var(--chakra-colors-darkGray-300);
      font-size: 100%;
   }
   .react-calendar__month-view__weekdays__weekday {
      color: var(--chakra-colors-darkGray-300);
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      abbr {
         text-decoration: none;
      }
   }
   .react-calendar__navigation__prev2-button,
   .react-calendar__navigation__next2-button {
      display: none;
   }
`
const MonthAvailability = styled.div`
   flex: 1 1 auto;
   margin-right: 0.2rem;

   .label {
      color: var(--chakra-colors-lightGray-700);
      font-size: 70%;
      margin-bottom: 0.15rem;
   }
   .colour-indicator {
      width: 100%;
      height: 0.5rem;
      border-radius: 0.2rem;

      &.past {
         background: var(--chakra-colors-lightGray-400);
      }
      &.curr {
         border: 2px solid black;
      }
      background: var(--chakra-colors-success-600);
   }
`

const languages = [
   { name: 'Croatian', level: 5 },
   { name: 'English', level: 3 },
]

const reviews = {
   count: 11,
   rating: 4,
}

const ViewProfile = () => {
   let { handle: handleParam } = useParams()
   const [profile, setProfile] = useState<ProfileType>()
   const [date, setDate] = useState(new Date())

   useEffect(() => {
      const handleGetProfile = async () => {
         if (handleParam !== undefined) {
            const result = await getProfiles({ handles: [handleParam] })
            if (
               result &&
               result.profiles &&
               result.profiles.items &&
               result.profiles.items[0]
            ) {
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
      timeZoneUtc,
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

   console.log(profile)

   const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
      // Add class to tiles in month view only
      if (view === 'month') {
         return isWithinRanges(date, disabledRanges)
      }
      return false
   }

   return (
      <Flex>
         <Box flex="1" p={8} mr={8}
            border="1px solid var(--chakra-colors-lightGray-400)"
            borderRadius="xl"
            background="white" position="relative">
            <Image src={`https://gateway.pinata.cloud/ipfs/${picture}`} alt="" width="4.4rem" />
            <CoverImage />

            <Flex justifyContent="space-between" mt={3}>
               <Flex alignItems="center">
                  <Box fontSize="xl" mr={4}>{name}</Box>
                  <Box fontSize="sm" color="lightGray.900">
                     @{handle}
                  </Box>
               </Flex>
               <Flex
                  color="lightGray.900"
                  alignItems="center"
                  fontSize="md"
                  mb={1}
               >
                  <MapPin height="1rem" stroke="var(--chakra-colors-lightGray-500)" />
                  <Box ml={1} mr={1}>
                     {location}
                  </Box>
                  <Box>
                     {timeZoneUtc &&
                        `(${formatAMPM(calcCurrTimeInTimeZone(timeZoneUtc))})`}
                  </Box>
               </Flex>
               <Box>
                  <Button variant="white" px={1}><ChatTeardropDots /></Button>
                  <Button variant="white" px={1}><Export /></Button>
                  <Button variant="white" px={1}><Heart /></Button>
               </Box>
            </Flex>

            <Flex alignItems="center">
               <Box width="10rem">Tours Organised</Box>
               <Flex alignItems="center">
                  4
                  <Box color="lightGray.700" fontSize="sm">
                     First tour: Jan 1, 2022
                  </Box>
               </Flex>
            </Flex>
            <Flex alignItems="center">
               <Box width="10rem">Languages</Box>
               <Flex alignItems="center">
                  {languages.map((l) => (
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
            </Flex>
            <Flex alignItems="center">
               <Box width="10rem">Reviews</Box>
               <Flex alignItems="center">
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
               </Flex>
            </Flex>
            <Flex alignItems="center">
               <Box width="10rem">Badges</Box>
               <Flex alignItems="center">
                  <BadgeGoogleLocalGuide />
                  <BadgeNekoguide />
                  <BadgeVerifiedUser />
               </Flex>
            </Flex>

            <Box>
               <Flex justifyContent="space-between" alignItems="center">
                  <Heading>About me</Heading>
                  <Box color="lightGray.900">Owned by {ownedBy}</Box>
               </Flex>
               <Text>{bio}</Text>
               
            </Box>
         </Box>

         <Box
            width="20rem"
            p={8}
            border="1px solid var(--chakra-colors-lightGray-400)"
            borderRadius="xl"
            background="white"
         >
            <Heading size="md" mb={5}>
               Availability
            </Heading>

            <Box my={3}>
               <Button variant="outline" size="xs">
                  <CaretLeft />
               </Button>
               <Box d="inline-block" px={3}>
                  {new Date().getFullYear()}
               </Box>
               <Button variant="black" size="xs">
                  <CaretRight />
               </Button>
            </Box>

            <Flex>
               {[
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
               ].map((month, i) => (
                  <MonthAvailability>
                     <Box className="label">{month}</Box>
                     <Box
                        className={`colour-indicator ${
                           i < currMonth
                              ? 'past'
                              : i === currMonth
                              ? 'curr'
                              : ''
                        }`}
                     ></Box>
                  </MonthAvailability>
               ))}
            </Flex>

            <CalendarWrapper>
               <Calendar
                  onChange={setDate}
                  value={date}
                  defaultView="month"
                  minDetail="month"
                  maxDetail="month"
                  minDate={today}
                  maxDate={oneYearFromNow}
                  prevLabel={
                     <CaretLeft
                        stroke="var(--chakra-colors-darkGray-400)"
                        height={14}
                     />
                  }
                  nextLabel={
                     <CaretRight
                        stroke="var(--chakra-colors-darkGray-400)"
                        height={14}
                     />
                  }
                  showNeighboringMonth={false}
                  locale="en"
                  selectRange={true}
                  tileDisabled={tileDisabled}
               />
            </CalendarWrapper>

            <Box my={6}></Box>
            <Select placeholder="Select tour">
               <option value="option1">Tour 1</option>
               <option value="option2">Tour 2</option>
               <option value="option3">Tour 3</option>
            </Select>
            <Button variant="black" width="100%">
               Book tour
            </Button>
            <Box textAlign="center" mt={3}>
               <Link href="#" fontSize="80%">
                  <span
                     style={{
                        marginRight: '.2rem',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                     }}
                  >
                     <ChatTeardropDots width={15} height={15} />
                  </span>
                  Customised trip? Message me :)
               </Link>
            </Box>
         </Box>
      </Flex>
   )
}

export default ViewProfile
