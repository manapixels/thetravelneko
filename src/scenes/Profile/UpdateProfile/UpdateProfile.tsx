import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
   Box,
   FormControl,
   Input,
   Button,
   FormLabel,
   Flex,
   Image,
   Textarea,
   Select,
   Heading,
   useToast,
   FormHelperText,
} from '@chakra-ui/react'
import { getTimeZones } from '@vvo/tzdb'
import { updateProfile } from '../../../services/profile/update-profile'
import { getProfiles } from '../../../services/profile/get-profiles'
import { countryList } from '../../../constants'
import UploadImage from './components/UploadImage'
import { setProfileImageUriNormal } from '../../../services/profile/set-profile-image-uri-normal'

const timeZones = getTimeZones()

const UpdateProfile = () => {
   let { handle: handleParam } = useParams()
   const toast = useToast()
   const [isFetching, setIsFetching] = useState(false)

   // Fields
   const [profileId, setProfileId] = useState()
   const [picture, setPicture] = useState<string>()
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState('')
   const [timeZoneUtc, setTimeZoneUtc] = useState(0)
   const [languages, setLanguages] = useState([])

   useEffect(() => {
      const handleGetProfile = async () => {
         if (handleParam) {
            const result = await getProfiles({ handles: [handleParam] })
            if (
               result &&
               result.profiles &&
               result.profiles.items &&
               result.profiles.items[0]
            ) {
               const profile = result.profiles.items[0]

               if (profile.id) setProfileId(profile.id)
               if (profile.name) setName(profile.name)
               if (profile.bio) setBio(profile.bio)
               if (profile.location) setLocation(profile.location)
               if (
                  profile.picture &&
                  profile.picture.original &&
                  profile.picture.original.url
               ) {
                  setPicture(profile.picture.original.url)
               }
            }
         }
      }
      handleGetProfile()
      document.title = `thetravelneko ?? Update Profile ?? ${handleParam}`;
   }, [])

   const handleUpdatePhoto = async (ipfshash: string) => {
      if (profileId && picture) {
         setIsFetching(true)
         let result = await setProfileImageUriNormal(profileId, ipfshash)
         console.log('setProfileImageUriNormal', result)

         toast({
            title: 'Photo updated',
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true,
         })
         setIsFetching(false)
      }
   }

   const handleUpdateProfile = async () => {
      if (profileId) {
         setIsFetching(true)
         let result = await updateProfile(profileId, name, bio, location)

         toast({
            title: 'Profile updated',
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true,
         })
         setIsFetching(false)
      }
   }

   useEffect(() => {
      const timezoneOffset = new Date().getTimezoneOffset()
      setTimeZoneUtc((timezoneOffset / 60) * -1)
   }, [])

   useEffect(() => {
      let _tz = timeZones.find((tz) => tz.countryName === location)
      if (_tz) {
         setTimeZoneUtc(_tz.currentTimeOffsetInMinutes / 60)
      }
   }, [location])

   return (
      <Box
         maxW="2xl"
         p={8}
         border="1px solid var(--chakra-colors-lightGray-400)"
         borderRadius="xl"
         background="white"
      >
         <Heading size="lg" mb="5">
            Update your profile
         </Heading>
         <FormControl d="inline-block" mb={3}>
            <FormLabel>Display photo</FormLabel>
            <Box position="relative">
               <UploadImage
                  picture={picture}
                  setPicture={setPicture}
                  handleUpdatePhoto={handleUpdatePhoto}
               />
               {picture && picture.length === 46 && (
                  <Image
                     src={`https://gateway.pinata.cloud/ipfs/${picture}`}
                     alt=""
                     width="4.4rem"
                     height="4.4rem"
                     margin="0.3rem"
                     position="absolute"
                     top={0}
                     left={0}
                     d="inline-block"
                     borderRadius="50%"
                  />
               )}
            </Box>
         </FormControl>

         <FormControl mb={3}>
            <FormLabel>Username</FormLabel>
            <Input
               type="text"
               placeholder="thetravelneko"
               d="inline-block"
               width="auto"
               size="lg"
               disabled={true}
               value={handleParam}
            />
         </FormControl>

         <FormControl d="inline-block" width="auto" mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
               type="text"
               placeholder="Your display name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               minWidth="20rem"
               size="lg"
               d="inline-block"
            />
         </FormControl>

         <FormControl d="inline-block" mb={3}>
            <FormLabel>
               <Flex justifyContent="space-between" alignItems="center">
                  About you{' '}
                  <FormHelperText>
                     {500 - bio.length} characters left
                  </FormHelperText>
               </Flex>
            </FormLabel>
            <Textarea
               placeholder=" Introduce yourself to the world! ????
               What do you want to get out this platform? ????
               Who do you want to meet? ????
               What do you love about your country? ????"
               value={bio}
               rows={6}
               maxLength={500}
               size="lg"
               onChange={(e) => setBio(e.target.value)}
            />
            <FormHelperText>{500 - bio.length} characters left</FormHelperText>
         </FormControl>

         <FormControl d="inline-block" width="auto" mb={3}>
            <FormLabel>Where are you based at?</FormLabel>
            <Select
               placeholder="Where are you based at?"
               size="lg"
               onChange={(e) => setLocation(e.target.value)}
               value={location}
            >
               {countryList.map((c) => (
                  <option value={c} key={c}>
                     {c}
                  </option>
               ))}
            </Select>
         </FormControl>

         <FormControl d="inline-block" width="auto" mb={3}>
            <FormLabel>Timezone</FormLabel>
            <Select
               placeholder="Select timezone"
               size="lg"
               onChange={(e) => setTimeZoneUtc(parseInt(e.target.value))}
               value={timeZoneUtc}
            >
               {timeZones &&
                  timeZones.map((t) => (
                     <option
                        value={t.currentTimeOffsetInMinutes / 60}
                        key={t.currentTimeFormat}
                     >
                        {t.currentTimeFormat}
                     </option>
                  ))}
            </Select>
         </FormControl>

         <Button
            variant="black"
            isLoading={isFetching}
            spinnerPlacement="start"
            loadingText="Updating"
            onClick={() => handleUpdateProfile()}
         >
            Update Profile
         </Button>
      </Box>
   )
}

export default UpdateProfile
