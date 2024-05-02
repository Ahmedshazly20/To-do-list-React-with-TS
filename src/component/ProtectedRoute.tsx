import React from 'react'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react';

interface Iprops {
    isAllowed:boolean,
    redirected: string,
    children: ReactNode;
  }
  function ProtectedRoute({isAllowed , redirected , children}:Iprops) {
     
   
    
    if(isAllowed) return children;
    
      return <Navigate to={redirected} />
  
    
    
  }
  

export default ProtectedRoute