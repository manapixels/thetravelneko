import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
   Box,
   FormControl,
   Input,
   Button,
   FormLabel,
   Flex,
   Textarea,
   Select,
   Heading,
   useToast,
   FormHelperText,
} from '@chakra-ui/react'
import { getTimeZones } from '@vvo/tzdb'
import { createProfile } from '../../../services/profile/create-profile'
import { updateProfile } from '../../../services/profile/update-profile'
import { getProfiles } from '../../../services/profile/get-profiles'
import { countryList } from '../../../constants'
import UploadImage from './components/UploadImage'
import { setProfileImageUriNormal } from '../../../services/profile/set-profile-image-uri-normal'

const timeZones = getTimeZones()

const CreateProfile = () => {
   const toast = useToast()
   const navigate = useNavigate()
   const [isFetching, setIsFetching] = useState(false)

   // Fields
   const [picture, setPicture] = useState()
   const [handle, setHandle] = useState('')
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState('')
   const [timeZoneUtc, setTimeZoneUtc] = useState(0)
   const [languages, setLanguages] = useState([])

   const handleCreateProfile = async () => {
      setIsFetching(true)
      const profilePictureUri = picture || ''
      let profileId = await createProfile(handle, profilePictureUri)

      if (profileId) {
         let result = await updateProfile(profileId, name, bio, location)
         if (picture) {
            result = await setProfileImageUriNormal(profileId, picture)
         }
         console.log(result)
      }

      toast({
         title: 'Profile created',
         status: 'success',
         duration: 5000,
         position: 'top',
         isClosable: true,
      })

      navigate(`/profile/${handle}`)

      setIsFetching(false)
   }

   useEffect(() => {
      const timezoneOffset = new Date().getTimezoneOffset()
      setTimeZoneUtc((timezoneOffset / 60) * -1)
      document.title = `thetravelneko · Create Profile`
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
            Create your profile
         </Heading>
         <FormControl d="inline-block" mb={3}>
            <FormLabel>Display photo</FormLabel>
            <UploadImage picture={picture} setPicture={setPicture} />
         </FormControl>

         <FormControl mb={3}>
            <FormLabel>Username</FormLabel>
            <Input
               type="text"
               placeholder="thetravelneko"
               d="inline-block"
               width="auto"
               size="lg"
               value={handle}
               onChange={(e) => setHandle(e.target.value)}
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
               placeholder=" Introduce yourself to the world! 😎
               What do you want to get out this platform? 🤓
               Who do you want to meet? 😮
               What do you love about your country? 🌈"
               value={bio}
               rows={6}
               maxLength={500}
               size="lg"
               onChange={(e) => setBio(e.target.value)}
            />
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
            loadingText="Creating"
            onClick={() => handleCreateProfile()}
         >
            Create Profile
         </Button>
      </Box>
   )
}

export default CreateProfile
