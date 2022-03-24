export interface ProfileType {
   id: string
   name: string
   bio?: string
   location?: string
   website?: string
   twitterUrl?: string
   picture?: string
   handle: string
   coverPicture?: string
   ownedBy: string
   stats?: {
      totalFollowers: number
      totalFollowing: number
      totalPosts: number
      totalComments: number
      totalMirrors: number
      totalPublications: number
      totalCollects: number
   }
}
