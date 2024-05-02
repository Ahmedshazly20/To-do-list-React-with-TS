import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements,Navigate } from "react-router-dom";
import ErrorHandler from '../component/ErrorHandler';
import ProtectedRoute from '../component/ProtectedRoute';
import RootLayout from '../component/RootLayout';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import ProfilePage from '../pages/ProfilePage';
import Signup from '../component/signup'
const isLoggedIn = false;
const router = createBrowserRouter(
  
    createRoutesFromElements(
      
      <>
      {/* {login   contribute} */}
        {/* Root Layout */}
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
            
        <Route path="/"  element={
           <ProtectedRoute isAllowed={isLoggedIn} redirected={"/LoginPage"} > 
           
           </ProtectedRoute>}/>

        <Route path="ProfilePage"  element={
           <ProtectedRoute isAllowed={isLoggedIn} redirected={"/LoginPage"} > 
            <ProfilePage/>
           </ProtectedRoute>}/>

       {/* Login page */}
       <Route path="LoginPage"  element={
       <ProtectedRoute isAllowed={!isLoggedIn} redirected={"/ProfilePage"} > 
            <LoginPage/>
        </ProtectedRoute>}/>


        {/* signup page */}
         <Route path="signup"  element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirected={"/ProfilePage"} > 
                <Signup/>
          </ProtectedRoute>}/>

       
        </Route>
        
  
       
        
        <Route path="*" element={<PageNotFound  />} />
  
        
      </>
    )
  );

export default router