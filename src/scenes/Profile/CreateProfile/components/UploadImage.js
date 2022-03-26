import { Image } from '@chakra-ui/react'
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

   input[type='file'] {
      opacity: 0;
      z-index: 1;
      width: 100%;
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

   svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      stroke-width: 2px;
      cursor: pointer;
   }

   &:hover {
      border-color: var(--chakra-colors-black);

      svg {
         z-index: 2;
      }
   }
`

const UploadImage = ({ picture, setPicture }) => {
   const [selectedFile, setSelectedFile] = useState()
   const [previewImage, setPreviewImage] = useState()

   const onFileChange = (event) => {
      // Update the state

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
               pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
            },
         })
         .then(function (response) {
            //handle response
            if (response && response.data && response.data.IpfsHash) {
               setPicture(response.data.IpfsHash)
            }
         })
         .catch(function (error) {
            console.log('Pinata pin error')
         })
   }

   return (
      <UploadImageWrapper>
         <label htmlFor="upload">
            <input type="file" id="upload" onChange={(e) => onFileChange(e)} accept="image/*" />
         
         <Image src={previewImage} />
         <CloudArrowUp />
         </label>
      </UploadImageWrapper>
   )
}

export default UploadImage
