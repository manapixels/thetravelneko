import { Image, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as CloudArrowUp } from '../images/CloudArrowUp.svg'

const UploadImageWrapper = styled.div`
   position: relative;
   display: inline-block;
   width: 5rem;
   height: 5rem;
   border-radius: 50%;
   border: 3px solid var(--chakra-colors-lightGray-400);
   cursor: pointer;
   z-index: 1;

   input[type='file'] {
      opacity: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
   }

   img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      box-sizing: border-box;
      z-index: 1;
   }

   img {
      display: none;
      cursor: pointer;
   }

   img[src] {
      display: initial;
   }
   .chakra-spinner {
      z-index: 2;
   }
   svg,
   .chakra-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      stroke-width: 2px;
      cursor: pointer;
   }

   &:hover {
      border-color: var(--chakra-colors-black);

      svg,
      .chakra-spinner {
         z-index: 2;
      }
   }
`

const UploadImage = ({ picture, setPicture }) => {
   const [selectedFile, setSelectedFile] = useState()
   const [previewImage, setPreviewImage] = useState()
   const [isFetching, setIsFetching] = useState(false)

   const onFileChange = (event) => {
      if (event.target.files[0]) {
         // Update the state
         setIsFetching(true)
         setSelectedFile(event.target.files[0])
         setPreviewImage(URL.createObjectURL(event.target.files[0]))
         const formData = new FormData()
         formData.append('file', event.target.files[0])

         // Pin to Pinata Cloud

         axios
            .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
               headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
                  pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                  pinata_secret_api_key:
                     process.env.REACT_APP_PINATA_API_SECRET,
               },
            })
            .then(function (response) {
               //handle response
               console.log('Successfully pinned to IPFS', response)
               if (response && response.data && response.data.IpfsHash) {
                  setPicture(response.data.IpfsHash)
               }
               setIsFetching(false)
            })
            .catch(function (error) {
               console.log('Pinata pin error')
               setIsFetching(false)
            })
      }
   }

   return (
      <UploadImageWrapper>
         <label htmlFor="upload">
            <input
               type="file"
               id="upload"
               onChange={(e) => onFileChange(e)}
               onClick={(e) => (e.target.value = null)}
               accept="image/*"
            />

            <Image src={previewImage} />
            {isFetching ? <Spinner /> : <CloudArrowUp />}
         </label>
      </UploadImageWrapper>
   )
}

export default UploadImage
