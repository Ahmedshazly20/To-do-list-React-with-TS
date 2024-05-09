import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements,Navigate } from "react-router-dom";
import ErrorHandler from '../component/ErrorHandler';
import ProtectedRoute from '../component/ProtectedRoute';
import RootLayout from '../component/RootLayout';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import ProfilePage from '../pages/ProfilePage';
import Signup from '../pages/signup'
import TodoList from './../pages/todo';


const storgeKey ="LoggedinUser"
const userDataString= localStorage.getItem(storgeKey)
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  
    createRoutesFromElements(
      
      <>
      {/* {login   contribute} */}
        {/* Root Layout */}
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
            
        <Route path="/"  element={
           <ProtectedRoute isAllowed={userData?.jwt} redirected={"/login"} > 
           <TodoList/>
           </ProtectedRoute>}/>

        <Route path="ProfilePage"  element={
           <ProtectedRoute isAllowed={userData?.jwt} redirected={"/login"} > 
            <ProfilePage/>
           </ProtectedRoute>}/>

       {/* Login page */}
       <Route path="login"  element={
       <ProtectedRoute isAllowed={!userData?.jwt} redirected={"/ProfilePage"} > 
            <LoginPage/>
        </ProtectedRoute>}/>


        {/* signup page */}
         <Route path="signup"  element={
          <ProtectedRoute isAllowed={!!userData?.jwt} redirected={"/ProfilePage"} > 
                <Signup/>
          </ProtectedRoute>}/>

       
        </Route>
        
  
       
        
        <Route path="*" element={<PageNotFound  />} />
  
        
      </>
    )
  );

export default router