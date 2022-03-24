import React, { useState } from 'react'
import { Box, Button, Image, Flex, Select } from '@chakra-ui/react'

import logo from '../images/logo.svg'
import { currencyList } from '../constants'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
   const [currency, setCurrency] = useState<string>(currencyList[0].code)

   return (
      <Flex
         justifyContent="space-between"
         alignItems="stretch"
         borderBottom="1px solid var(--chakra-colors-gray-200)"
         px={8}
      >
         <Link to="/" style={{ display: "flex" }}><Image src={logo} alt="" /></Link>

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
            <Button variant="black" borderRadius="1.5rem">Sign in using wallet</Button>
         </Box>
      </Flex>
   )
}

export default Header
