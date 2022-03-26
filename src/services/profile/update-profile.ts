import { gql } from '@apollo/client/core'
import { apolloClient } from '../apollo-client'
import { login } from '../authentication/login'
import { PROFILE_ID } from '../config'
import { getAddressFromSigner } from '../ethers.service'

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`

const updateProfileRequest = (profileInfo: {
   profileId: string
   name: string
   bio: string
   location: string
   timeZoneUtc?: number
   website?: string
   twitterUrl?: string
   profilePictureUri?: string
   coverPicture?: string
   languages?: Array<{
      name: string
      level: number
   }>
}) => {
   return apolloClient.mutate({
      mutation: gql(UPDATE_PROFILE),
      variables: {
         request: profileInfo,
      },
   })
}

export const updateProfile = async (
   profileId: string,
   name: string,
   bio: string,
   location: string,
   website?: string,
   twitterUrl?: string,
   coverPicture?: string
) => {
   //  const profileId = PROFILE_ID
   //  if (!profileId) {
   //     throw new Error('Must define PROFILE_ID in the .env to run this')
   //  }

   const address = getAddressFromSigner()
   console.log('update profile: address', address)

   await login(address)

   await updateProfileRequest({
      profileId,
      name,
      bio,
      location,
      website,
      twitterUrl,
      coverPicture,
   })
}
