import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

export default function ProtectAuthRoutes({childern}) {

   const {userToken}= useContext(AuthContext);
  return (
     <>




    {!userToken ? childern :<Navigate to={"/"}/>}
    </>
  )
  
}
