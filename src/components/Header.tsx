import { useState } from 'react'
import { Box, Button, Image, Flex, Select, Link } from '@chakra-ui/react'

import logo from '../images/logo.svg'
import { ReactComponent as HandGrabbing } from '../images/HandGrabbing.svg'
import { currencyList } from '../constants'
import { Link as RLink } from 'react-router-dom'

const Header = () => {
   const [currency, setCurrency] = useState<string>(currencyList[0].code)

   return (
      <Flex
         justifyContent="space-between"
         alignItems="stretch"
         borderBottom="1px solid var(--chakra-colors-gray-200)"
         px={8}
         py={1}
         background="white"
      >
         <RLink to="/" style={{ display: "flex" }}><Image src={logo} alt="" /></RLink>

         <Box p={2}>
            <Select
               size="sm"
               onChange={(e) => setCurrency(e.target.value)}
               value={currency}
               borderColor="white"
               focusBorderColor="black"
               width="4.9rem"
               display="inline-block"
               mr={2}
            >
               {currencyList.map((c) => (
                  <option value={c.code} key={c.code}>
                     $ {c.code} · {c.name}
                  </option>
               ))}
            </Select>
            <Button borderRadius="1.5rem" className="heartbeat-on-hover" as={Link} href="/profile/create" mr={3}>
                  Create Profile
            </Button>
            <Button variant="black" borderRadius="1.5rem" className="heartbeat-on-hover">
               <Flex alignItems="center">
                  <Box mr={1}>Sign in</Box>
                  <HandGrabbing />
               </Flex>
            </Button>
         </Box>
      </Flex>
   )
}

export default Header
