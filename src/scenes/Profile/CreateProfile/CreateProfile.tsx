import { useState } from 'react'
import {
   Box,
   Checkbox,
   FormControl,
   Input,
   Button,
   FormLabel,
} from '@chakra-ui/react'
import { createProfile } from '../../../services/profile/create-profile'

const CreateProfile = () => {
   const [handle, setHandle] = useState('')
   const [followFee, setFollowFee] = useState(0)

   const handleCreateProfile = async () => {
      const result = await createProfile(handle)
      console.log(result)
   }

   return (
      <Box>
         <FormControl d="inline-block" w="28rem" verticalAlign="middle">
            <FormLabel>Handle</FormLabel>
            <Input
               id="handle"
               type="text"
               placeholder="@handle"
               value={handle}
               onChange={(e) => setHandle(e.target.value)}
               minWidth="26rem"
            />
         </FormControl>
{/* 
         <FormControl>
            <Checkbox
               checked={followFee === 0 ? true : false}
               onChange={(e) => setFollowFee(e.target.checked === true ? 1 : 0)}
            >
               Follow fee
            </Checkbox>
            <Input
               id="follow-fee"
               type="number"
               placeholder="Follow fee"
               disabled={followFee === 0}
               value={followFee}
               onChange={(e) => setFollowFee(parseInt(e.target.value))}
               minWidth="5rem"
            />
         </FormControl> */}

         <Button variant="black" onClick={() => handleCreateProfile()}>Create Profile</Button>
      </Box>
   )
}

export default CreateProfile
