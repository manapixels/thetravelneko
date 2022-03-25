import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

const Circle = styled.div`
   width: 5rem;
   height: 5rem;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 200%;
   font-weight: bold;
   text-align: center;
   -webkit-text-stroke: 1px white;

   &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 5rem;
      height: 5rem;
      opacity: 0.8;
      border-radius: 50% !important;
      background: var(--chakra-colors-lightGray-500);
      border: 2px solid var(--chakra-colors-darkGray-100);
      z-index: -1;
      transition: transform 0.3s ease-in-out 0s, background 0.3s ease-in-out 0s;
   }

   &:hover {
       &:before {
        transform: scale(1.2);
        background: var(--chakra-colors-lightGray-600);
       }
   }

   &.active {
      &:before {
        border-color: var(--chakra-colors-black);
        background: var(--chakra-colors-lightGray-600);
       }
   }
`

const CountryHotspot = (country) => {
   const { name, lat, lng, count } = country || {}

   return (
      <Box minWidth="4rem" position="relative">
         <Box
            p={1}
            bg={name === 'Singapore' ? 'black' : 'darkGray.100'}
            color="white"
            position="absolute"
            top=".3rem"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1}
            textAlign="center"
            width="100%"
         >
            {name}
         </Box>
         <Circle className={name === 'Singapore' && 'active'}>{count}</Circle>
      </Box>
   )
}

export default CountryHotspot
