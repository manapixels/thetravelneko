import { useEffect, useState } from 'react'
import {
   Avatar,
   Box,
   Image,
   Flex,
   Heading,
   Button,
   Select,
   Link,
   Text,
   Divider,
   Spinner,
   useToast,
   AvatarBadge,
   Tag,
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
import mazeBg from './images/mazeBg.png'
import { getProfiles } from '../../../services/profile/get-profiles'
import { ProfileType } from '../../../types/Profile'
import {
   formatAMPM,
   isWithinRanges,
   calcCurrTimeInTimeZone,
} from '../../../helpers/date'
import { truncateAddress } from '../../../helpers/truncateString'
import { follow } from '../../../services/follow/follow'
import { doesFollow } from '../../../services/follow/does-follow'
import { unfollow } from '../../../services/follow/unfollow'

const today = new Date()
const currMonth = today.getMonth()
const oneYearFromNow = addYears(today, 1)
const oneYearBeforeNow = subYears(today, 1)
const disabledRanges = [[oneYearBeforeNow, today]]

const CoverImage = styled.div`
   /* background: linear-gradient(
         180deg,
         rgba(255, 255, 255, 0) 0%,
         rgba(255, 255, 255, 0) 50%,
         rgba(255, 255, 255, 1) 100%
      ),
      url(${worldMap}); */
   background: linear-gradient(
         135deg,
         rgba(0, 0, 0, 0) 0%,
         rgba(0, 0, 0, 0) 50%,
         rgba(30, 30, 30, 1) 100%
      ),
      url(${mazeBg}) repeat;
   height: 11rem;
   border-radius: var(--chakra-radii-lg);
`
const InfoSection = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 0.5rem;
`
const InfoSectionTitle = styled.div`
   width: 10rem;
   font-size: 80%;
   color: var(--chakra-colors-lightGray-900);
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
   { name: 'English', level: 5 },
   { name: 'Mandarin Chinese', level: 5 },
   { name: 'German', level: 1 },
]

const reviews = {
   count: 11,
   rating: 4,
}

const ViewProfile = () => {
   let { handle: handleParam } = useParams()
   const toast = useToast()

   const [profile, setProfile] = useState<ProfileType>()
   const [date, setDate] = useState(new Date())
   const [isFetching, setIsFetching] = useState(false)
   const [isFollowing, setIsFollowing] = useState(false)

   const {
      id,
      name,
      bio,
      location,
      timeZoneUtc,
      website,
      twitterUrl,
      picture: picObject,
      handle,
      coverPicture,
      ownedBy,
      stats,
   } = profile || {}
   const picture = picObject && picObject.original && picObject.original.url
   const {
      totalFollowers = 0,
      totalFollowing = 0,
      totalPosts,
      totalComments,
      totalMirrors,
      totalPublications,
      totalCollects,
   } = stats || {}

   useEffect(() => {
      handleGetProfile()
      handleGetDoesFollow()
      document.title = `thetravelneko · ${handleParam}`
   }, [handleParam, id])

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

   const handleGetDoesFollow = async () => {
      if (id !== undefined) {
         const result = await doesFollow(id)
         console.log('fetched handleGetDoesFollow', result)
         if (result && result.doesFollow && result.doesFollow[0]) {
            setIsFollowing(result.doesFollow[0].follows)
         }
      }
   }

   const handleFollow = async () => {
      if (id) {
         setIsFetching(true)
         let result = await follow(id)
         console.log('follow', result)

         toast({
            title: `Followed ${handle}`,
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true,
         })
         setIsFetching(false)

         setIsFollowing(true)
      }
   }

   const handleUnfollow = async () => {
      if (id) {
         setIsFetching(true)
         let result = await unfollow(id)
         console.log('unfollow', result)

         toast({
            title: `Unfollowed ${handle}`,
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true,
         })
         setIsFetching(false)
         setIsFollowing(false)
      }
   }

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
         <Box
            flex="1"
            mr={8}
            border="1px solid var(--chakra-colors-lightGray-400)"
            borderRadius="xl"
            background="white"
            position="relative"
            maxW="3xl"
         >
            <CoverImage />

            <Box px={12} pb={12}>
               <Avatar
                  size="xl"
                  name={handleParam}
                  bg="lightGray.500"
                  marginTop="calc(var(--chakra-sizes-24)/-3)"
                  src={
                     picture
                        ? `https://gateway.pinata.cloud/ipfs/${picture}`
                        : ''
                  }
               >
                  <AvatarBadge bg="success.400" boxSize=".8em" />
               </Avatar>
               <Flex justifyContent="space-between" mt={3}>
                  <Box mb={5}>
                     <Flex alignItems="center" mb={1}>
                        <Box
                           fontSize="2xl"
                           mr={2}
                           fontWeight="bold"
                           color="darkGray.700"
                        >
                           {name}
                        </Box>
                        <Box fontSize="md" color="lightGray.900">
                           @{handle}
                        </Box>
                     </Flex>
                     <Flex
                        color="lightGray.900"
                        alignItems="center"
                        fontSize="md"
                        mb={1}
                     >
                        <MapPin
                           height="1rem"
                           stroke="var(--chakra-colors-lightGray-500)"
                        />
                        <Box>{location}</Box>
                        <Box>
                           {timeZoneUtc &&
                              `(${formatAMPM(
                                 calcCurrTimeInTimeZone(timeZoneUtc)
                              )})`}
                        </Box>
                     </Flex>
                  </Box>
                  <Box>
                     <Button mr={2} px={1}>
                        <ChatTeardropDots width="1.5rem" />
                     </Button>
                     <Button mr={2} px={1}>
                        <Export width="1.5rem" />
                     </Button>
                     <Button
                        mr={2}
                        px={1}
                        onClick={() =>
                           isFollowing ? handleUnfollow() : handleFollow()
                        }
                        disabled={isFetching}
                     >
                        {isFetching ? (
                           <Spinner />
                        ) : (
                           <Heart
                              width="1.5rem"
                              fill={isFollowing ? 'black' : 'none'}
                           />
                        )}
                        {!isFetching &&
                           (isFollowing ? totalFollowers + 1 : totalFollowers)}
                     </Button>
                     <Link href={`/profile/${handle}/update`}>
                        <Button variant="outline">Edit Profile</Button>
                     </Link>
                  </Box>
               </Flex>

               <Box mb="5">
                  <Tag size="md" variant="subtle" colorScheme="twitter">
                     🚩 Local Tour Guide
                  </Tag>
               </Box>

               <InfoSection>
                  <InfoSectionTitle>Tours Organised</InfoSectionTitle>
                  <Flex alignItems="center">
                     <Box fontSize="lg" mr={4}>
                        4
                     </Box>
                     <Box color="lightGray.700" fontSize="sm">
                        First tour: Jan 1, 2022
                     </Box>
                  </Flex>
               </InfoSection>
               <InfoSection>
                  <InfoSectionTitle>Languages</InfoSectionTitle>
                  <Flex alignItems="center">
                     {languages.map((l) => (
                        <Flex alignItems="center" mr={3} key={l.name}>
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
               </InfoSection>
               <InfoSection>
                  <InfoSectionTitle>Reviews</InfoSectionTitle>
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
                           <Box color="lightGray.900" fontSize="sm" ml={2}>
                              {reviews.count} reviews
                           </Box>
                        </Flex>
                     )}
                  </Flex>
               </InfoSection>
               <InfoSection>
                  <InfoSectionTitle>Badges</InfoSectionTitle>
                  <Flex alignItems="center">
                     <Box mr={3}>
                        <BadgeGoogleLocalGuide />
                     </Box>
                     <Box mr={3}>
                        <BadgeNekoguide />
                     </Box>
                     <Box>
                        <BadgeVerifiedUser />
                     </Box>
                  </Flex>
               </InfoSection>

               <Divider my={8} />

               <Box>
                  <Flex
                     justifyContent="space-between"
                     alignItems="center"
                     mb={5}
                  >
                     <Heading size="md">About me</Heading>
                     <Box color="lightGray.900" fontSize="sm">
                        Owned by{' '}
                        <Link
                           href={`https://polygonscan.com/address/${ownedBy}`}
                        >
                           {truncateAddress(ownedBy)}
                        </Link>
                     </Box>
                  </Flex>
                  <Text>{bio}</Text>
               </Box>
            </Box>
         </Box>

         <Box
            width="20rem"
            p={8}
            border="1px solid var(--chakra-colors-lightGray-400)"
            borderRadius="xl"
            background="white"
            alignSelf="flex-start"
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
                  <MonthAvailability key={month}>
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
