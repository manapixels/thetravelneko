export interface ProfileType {
   id: string
   name: string
   bio?: string
   location?: string
   timeZoneUtc?: number
   website?: string
   twitterUrl?: string
   picture?: {
      original?: {
         url: string
      }
   }
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
   languages?: Array<{
      name: string
      level: number
   }>
   reviews?: {
      count: number
      rating: number
   }
}
