import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {
   ApolloProvider,
   ApolloClient,
   InMemoryCache,
   HttpLink,
   ApolloLink,
} from '@apollo/client'

import { App } from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = `${process.env['REACT_APP_COVALENT_API_URL']}`

const authLink = new ApolloLink((operation, forward) => {
   const token = localStorage.getItem('auth_token')

   operation.setContext({
      headers: {
         'x-access-token': token ? `Bearer ${token}` : '',
      },
   })

   // Call the next link in the middleware chain.
   return forward(operation)
})

const httpLink = new HttpLink({ uri: process.env.LENS_ENDPOINT })

export const apolloClient = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <React.StrictMode>
      <ColorModeScript />
      <ApolloProvider client={apolloClient}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ApolloProvider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
