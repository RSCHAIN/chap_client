import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Confidential() {
  const [displayed,setDisplayed] = useState("grid")

  const acceptCookie = ({allow,displayedd}) =>{
    sessionStorage.setItem("AllowCookie",allow)
    sessionStorage.setItem("displayed",displayedd)
    setDisplayed(displayedd)
  }
useEffect(() => {
  console.log(sessionStorage.getItem("displayed"));
  setDisplayed(sessionStorage.getItem("displayed") ?? "grid")
})

  return (
    <Box display={displayed}>
    <div className=' overflow-auto p-10 bg-white w-full fixed lg:top-[80vh] xs:top-[50vh] text-black '>
        <div className=' flex flex-row gap-32'>
            <div>
        <p className=' lg:text-3xl default:text-lg font-bold font-sans  '> Paramètres de confidentialité</p>
        <p className='lg:text-lg default:text-xs'> <b>Notre site Web protège vos données à caractère personnel conformément au règlement général de protection des données (RGPD) de l{"'"}Union européenne. Nous traiterons vos données personnelles </b>sur la base de votre consentement préalable et uniquement aux fins spécifiques. Vous pouvez consentir au traitement de vos données à des fins spécifiques ci-dessous en cliquant sur « Je suis d{"'"}accord ».
        </p>
        </div>
        <div>
        <button type="button" onClick={()=>acceptCookie({allow:"Yes",displayedd:"none"})} className=' bg-blue-400 text-white p-1 mb-1  border'> Je suis d{"'"}accord</button>
        <button type="button" onClick={()=>acceptCookie({allow:"No",displayedd:"none"})} className=' bg-blue-400 text-white p-1 mb-1  border'> Tout supprimer</button>
        
        </div>
        </div>
    </div>
    </Box>
  )
}

export default Confidential